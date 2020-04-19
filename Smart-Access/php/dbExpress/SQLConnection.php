<?php

/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

include_once __DIR__ . "/../config.php";
include_once __DIR__ . "/../auth/AuthManager.php";

  class SQLConnection extends mysqli {

    public function executeQuery($aQuery, ... $aParams) {
      $varResult = false;
      $varQuery = sprintf($aQuery, ... $aParams);
      $varResult = $this->query($varQuery);
      return $varResult;
    }

    public function fetchQuery($aQuery, ... $aArgs) {
      $iArgCount = count($aArgs);
      if ($iArgCount === 0) throw new InvalidArgumentException("No OnExecutionFuction");
      $aOnExecute = $aArgs[$iArgCount - 1];

      $varQuery = sprintf($aQuery, ... $aArgs);
      $varResult = $this->query($varQuery);
      $aOnExecute($varResult);
    }

    public function fetchRows($aQuery, ... $aArgs) {
      $iArgCount = count($aArgs);
      if ($iArgCount === 0) throw new InvalidArgumentException("No OnExecutionFuction");
      $aOnExecute = $aArgs[$iArgCount - 1];

      $varQuery = sprintf($aQuery, ... $aArgs);
      $varResult = $this->query($varQuery);
      while ($varRow = $varResult->fetch_assoc()) {
        $aOnExecute($varRow);
      }
    }

    /****************************************************************************************************************
     ---------------------------------------------- Static Functions ------------------------------------------------
     ****************************************************************************************************************/

    public static function New($aSQLConnEvent = null) {
      $varConn = new SQLConnection(cDB_HOSTNAME . ':' . cDB_PORT, cDB_USERNAME, cDB_PASSWORD, cDB_DATABASE);
      $varConnError = mysqli_connect_error();
      if ($varConnError) {
        die("Connection failed: " . $varConnError);
        throw new Exception("Cannot connect to database: " . $varConnError);
      } else if ($aSQLConnEvent) {
        try {
          $aSQLConnEvent($varConn);
        } finally {
          mysqli_close($varConn);
        }
      } else {
          return $varConn;
      }
    }

    public static function ExecuteQueryEx($aQuery, ... $aParams) {
      $varResult = false;
      $varSQLConn = SQLConnection::New();
      try {
        $varResult = $varSQLConn->executeQuery($aQuery, ... $aParams);
      } finally {
        mysqli_close($varSQLConn);
      }

      return $varResult;
    }

    public static function FetchQueryEx($aQuery, ... $aArgs) {
      $varSQLConn = SQLConnection::New();
      try {
        $varSQLConn->fetchQuery($aQuery, ... $aArgs);
      } finally {
        mysqli_close($varSQLConn);
      }
    }

    public static function FetchRowsEx($aQuery, ... $aArgs) {
      $varSQLConn = SQLConnection::New();
      try {
        $varSQLConn->fetchRows($aQuery, ... $aArgs);
      } finally {
        mysqli_close($varSQLConn);
      }
    }

  }

?>