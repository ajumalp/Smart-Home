<?php

class MQTTClient {

	private $socket;
	private $msgid = 1;
	private $keepalive = 10;
	private $username;
	private $password;
	private $address;
	private $port;
	private $clientid;
	private $will;
	private $debug = false;

	function __construct($address, $port, $clientid) {
		$this->address = $address;
		$this->port = $port;
		$this->clientid = $clientid;
	}

	function connect($clean = true, $will = null, $username = null, $password = null) {
		if($will) $this->will = $will;
		if($username) $this->username = $username;
		if($password) $this->password = $password;

		// currently support tcp only { Ajmal }
		$this->socket = stream_socket_client("tcp://" . $this->address . ":" . $this->port, $errno, $errstr, 60, STREAM_CLIENT_CONNECT);

		if (!$this->socket) {
		    if($this->debug) error_log("stream_socket_create() $errno, $errstr \n");
			return false;
		}

		stream_set_timeout($this->socket, 5);
		stream_set_blocking($this->socket, 0);

		$i = 0; $buffer = "";

		$buffer .= chr(0x00); $i++;
		$buffer .= chr(0x06); $i++;
		$buffer .= chr(0x4d); $i++;
		$buffer .= chr(0x51); $i++;
		$buffer .= chr(0x49); $i++;
		$buffer .= chr(0x73); $i++;
		$buffer .= chr(0x64); $i++;
		$buffer .= chr(0x70); $i++;
		$buffer .= chr(0x03); $i++;

		//No Will
		$var = 0;
		if($clean) $var += 2;

		//Add will info to header
		if($this->will != NULL){
			$var += 4; // Set will flag
			$var += ($this->will['qos'] << 3); //Set will qos
			if($this->will['retain'])	$var += 32; //Set will retain
		}

		if($this->username != NULL) $var += 128;	//Add username to header
		if($this->password != NULL) $var += 64;	//Add password to header

		$buffer .= chr($var); $i++;

		//Keep alive
		$buffer .= chr($this->keepalive >> 8); $i++;
		$buffer .= chr($this->keepalive & 0xff); $i++;

		$buffer .= $this->strwritestring($this->clientid,$i);

		//Adding will to payload
		if ($this->will != NULL) {
			$buffer .= $this->strwritestring($this->will['topic'],$i);
			$buffer .= $this->strwritestring($this->will['content'],$i);
		}

		if ($this->username) $buffer .= $this->strwritestring($this->username,$i);
		if ($this->password) $buffer .= $this->strwritestring($this->password,$i);

		$head = "  ";
		$head[0] = chr(0x10);
		$head[1] = chr($i);

		fwrite($this->socket, $head, 2);
		fwrite($this->socket,  $buffer);

	 	$string = $this->read(4);

		if (ord($string[0])>>4 == 2 && $string[3] == chr(0)) {
			if($this->debug) echo "Connected to Broker\n";
		} else {
			error_log(sprintf("Connection failed! (Error: 0x%02x 0x%02x)\n", ord($string[0]),ord($string[3])));
			return false;
		}

		return true;
	}

	private function read($int = 8192, $nb = false){
		$string="";
		$togo = $int;

		if($nb) return fread($this->socket, $togo);

		while (!feof($this->socket) && $togo>0) {
			$fread = fread($this->socket, $togo);
			$string .= $fread;
			$togo = $int - strlen($string);
		}

		return $string;
	}

	function disconnect() {
		$head = " ";
		$head[0] = chr(0xe0);
		$head[1] = chr(0x00);
		fwrite($this->socket, $head, 2);
	}

	// Close: sends a proper Disconect, then closes the socket
	function close() {
	 	$this->disconnect();
		stream_socket_shutdown($this->socket, STREAM_SHUT_WR);
	}

	function publish($topic, $content, $qos = 0, $retain = 0) {
		$i = 0;
		$buffer = $this->strwritestring($topic,$i);

		if($qos){
			$id = $this->msgid++;
			$buffer .= chr($id >> 8);  $i++;
		 	$buffer .= chr($id % 256);  $i++;
		}

		$buffer .= $content;
		$i+=strlen($content);


		$head = " ";
		$cmd = 0x30;
		if($qos) $cmd += $qos << 1;
		if($retain) $cmd += 1;

		$head[0] = chr($cmd);
		$head .= $this->setmsglength($i);

		fwrite($this->socket, $head, strlen($head));
		fwrite($this->socket, $buffer, $i);
	}

	private function setmsglength($len) {
		$string = "";
		do{
		  $digit = $len % 128;
		  $len = $len >> 7;
		  // if there are more digits to encode, set the top bit of this digit
		  if ( $len > 0 )
		    $digit = ($digit | 0x80);
		  $string .= chr($digit);
		}while ( $len > 0 );
		return $string;
	}

	private function strwritestring($str, &$i) {
		$ret = " ";
		$len = strlen($str);
		$msb = $len >> 8;
		$lsb = $len % 256;
		$ret = chr($msb);
		$ret .= chr($lsb);
		$ret .= $str;
		$i += ($len+2);
		return $ret;
	}

}
