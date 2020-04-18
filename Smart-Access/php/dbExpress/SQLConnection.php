<?php

include __DIR__ . "/../config.php";

  class SQLConnection extends mysqli {

    public function executeQuery($aQuery, $aParams = null) {
      $varResult = false;
      $varQuery = sprintf($aQuery, $aParams);
      $varResult = $this->query($varQuery);
      return $varResult;
    }

    public function fetchQuery($aQuery, $aArg1, $aArg2 = null, $aFetchRows = false) {
      $aParams = $aArg1;
      $aOnExecute = $aArg2;
      if ($aArg2 === null) {
        $aParams = null;
        $aOnExecute = $aArg1;
      }

      $varQuery = sprintf($aQuery, $aParams);
      $varResult = $this->query($varQuery);
      if ($aFetchRows) {
        while ($varRow = $varResult->fetch_assoc()) {
          $aOnExecute($varRow);
        }
      } else {
        $aOnExecute($varResult);
      }
    }

    public function fetchRows($aQuery, $aArg1, $aArg2 = null) {
      return $this->fetchQuery($aQuery, $aArg1, $aArg2, true);
    }

    public static function New() {
      $varConn = new SQLConnection(cDB_HOSTNAME . ':' . cDB_PORT, cDB_USERNAME, cDB_PASSWORD, cDB_DATABASE);
      if ($varConn->connect_error) {
        die("Connection failed: " . mysqli_connect_error());
        throw new Exception("Cannot connect to database");
      } else {
          return $varConn;
      }
    }

    public static function ExecuteQueryEx($aQuery, $aParams = null) {
      $varResult = false;
      $varSQLConn = SQLConnection::New();
      try {
        $varResult = $varSQLConn->executeQuery($aQuery, $aParams);
      } finally {
        mysqli_close($varSQLConn);
      }

      return $varResult;
    }

    public static function FetchQueryEx($aQuery, $aArg1, $aArg2 = null, $aFetchRows = false) {
      $varSQLConn = SQLConnection::New();
      try {
        $varSQLConn->fetchQuery($aQuery, $aArg1, $aArg2, $aFetchRows);
      } finally {
        mysqli_close($varSQLConn);
      }
    }

    public static function FetchRowsEx($aQuery, $aArg1, $aArg2 = null) {
      return SQLConnection::FetchQueryEx($aQuery, $aArg1, $aArg2, true);
    }

  }
