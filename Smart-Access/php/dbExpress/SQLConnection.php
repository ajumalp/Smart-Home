<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

namespace ES\Core;

use Exception;
use InvalidArgumentException;
use mysqli;

include_once __DIR__ . "/../config.php";

  class SQLConnection extends mysqli {

    static private $lastError = "";

    static public function LastError(): string {
      return SQLConnection::$lastError;
    }

    private function clearError() {
      SQLConnection::$lastError = "";
    }

    public function executeQuery($aQuery, ... $aParams): int {
      $this->clearError();
      AuthManager::LowSecurityValidation();
      $varQuery = sprintf($aQuery, ... $aParams);
      $this->query($varQuery);
      SQLConnection::$lastError = $this->error;
      return $this->affected_rows;
    }

    public function fetchQuery($aQuery, ... $aArgs) {
      $this->clearError();
      AuthManager::LowSecurityValidation();
      $iArgCount = count($aArgs);
      if ($iArgCount === 0) throw new InvalidArgumentException("No OnExecutionFuction");
      $aOnExecute = $aArgs[$iArgCount - 1];

      $varQuery = sprintf($aQuery, ... $aArgs);
      $varResult = $this->query($varQuery);
      $aOnExecute($varResult);
      SQLConnection::$lastError = $this->error;
    }

    public function fetchRows($aQuery, ... $aArgs) {
      $this->clearError();
      AuthManager::LowSecurityValidation();
      $iArgCount = count($aArgs);
      if ($iArgCount === 0) throw new InvalidArgumentException("No OnExecutionFuction");
      $aOnExecute = $aArgs[$iArgCount - 1];

      $varQuery = sprintf($aQuery, ... $aArgs);
      $varResult = $this->query($varQuery);
      while ($varRow = $varResult->fetch_assoc()) {
        $aOnExecute($varRow);
      }
      SQLConnection::$lastError = $this->error;
    }

    public function AsJSON($aQuery, ... $aArgs) {
      $this->clearError();
      AuthManager::LowSecurityValidation();
      $varQuery = sprintf($aQuery, ... $aArgs);
      $varResult = $this->query($varQuery);
      $varRows = array();
      while ($varRow = $varResult->fetch_assoc()) {
        $varRows[] = $varRow;
      }
      SQLConnection::$lastError = $this->error;
      return json_encode($varRows);
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
          // AuthManager::ValidateLogin();
          $aSQLConnEvent($varConn);
        } finally {
          mysqli_close($varConn);
        }
      } else {
          return $varConn;
      }
    }

    public static function ExecuteQueryEx($aQuery, ... $aParams): int {
      $varResult = 0;
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

    public static function AsJSONEx($aQuery, ... $aArgs) {
      $varSQLConn = SQLConnection::New();
      try {
        return $varSQLConn->AsJSON($aQuery, ... $aArgs);
      } finally {
        mysqli_close($varSQLConn);
      }
    }

  }