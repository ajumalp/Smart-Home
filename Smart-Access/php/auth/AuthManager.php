<?php

  include_once __DIR__ . "/../dbExpress/SQLConnection.php";
  include_once __DIR__ . "/../config.php";

  include_once "AuthManagerExceptions.php";

  class AuthManager {

    const cSESSION_ISLOGGEDIN = "isLoggedIn";
    const cSESSION_LOGGEDINUSERID = "loggedInUserID";
    const cSESSION_LOGGEDINUSERNAME = "loggedInUserName";

    const cSQL_CREATE_TABLE = "CREATE TABLE " . cAUTH_TABLE . " (USERID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              USERNAME VARCHAR(50) NOT NULL UNIQUE,
                              PASSWORD VARCHAR(255) NOT NULL,
                              CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP
    )";

    static function AddUser($aUserName, $aPassword, $aSQLConn = null) {
      if (empty($aUserName)) throw new InvalidUserException("No UserName");
      elseif (strlen(trim($aUserName)) < 5) new InvalidUserException("UserName must have atleast 5 characters");
      elseif (empty($aPassword)) throw new InvalidPasswordException("No Password");
      elseif(strlen(trim($aPassword)) < 6) throw new InvalidPasswordException("Password must have atleast 6 characters");

      $cSQL_INSERT_USER = "INSERT INTO " . cAUTH_TABLE . " (USERNAME, PASSWORD) VALUES ('%s', '%s')";

      $varPasswordHash = password_hash($aPassword, PASSWORD_DEFAULT);
      if ($aSQLConn === null) {
        return SQLConnection::ExecuteQueryEx($cSQL_INSERT_USER, $aUserName, $varPasswordHash);
      } else {
        return $aSQLConn->executeQuery($cSQL_INSERT_USER, $aUserName, $varPasswordHash);
      }
    }

    static function LogIn($aUserName, $aPassword, $aSQLConn = null) {
      $bResult = false;
      $iUserID = -1;
      $sUserName = '';

      if (strlen(trim($aUserName)) < 5) throw new InvalidUserException("Invalid UserName");
      elseif(strlen(trim($aPassword)) < 6) throw new InvalidPasswordException("Invalid Password");

      $cSQL_SELECT_USER = "SELECT USERID, USERNAME, PASSWORD FROM " . cAUTH_TABLE . " WHERE USERNAME = '%s'";

      try {
        if ($aSQLConn === null) {
          SQLConnection::FetchRowsEx($cSQL_SELECT_USER, $aUserName, function($varRow) use ($aPassword, &$iUserID, &$sUserName, &$bResult) {
            $iUserID = $varRow['USERID'];
            $sUserName = $varRow['USERNAME'];
            $bResult = password_verify($aPassword, $varRow['PASSWORD']);
          });
        } else {
          $aSQLConn->fetchRows($cSQL_SELECT_USER, $aUserName, function($varRow) use ($aPassword, &$iUserID, &$sUserName, &$bResult) {
            $iUserID = $varRow['USERID'];
            $sUserName = $varRow['USERNAME'];
            $bResult = password_verify($aPassword, $varRow['PASSWORD']);
          });
        }
      } catch (Exception $ex) {
        return false;
      }

      if ($bResult) {
        session_start();
        $_SESSION[AuthManager::cSESSION_ISLOGGEDIN] = true;
        $_SESSION[AuthManager::cSESSION_LOGGEDINUSERID] = $iUserID;
        $_SESSION[AuthManager::cSESSION_LOGGEDINUSERNAME] = $sUserName;
      }

      return $bResult;
    }

    static function IsLoggedIn($aUserName = null) {
      session_start();
      if ($_SESSION[AuthManager::cSESSION_ISLOGGEDIN]) {
        if ($aUserName === null) return true;
        return $aUserName === $_SESSION[AuthManager::cSESSION_LOGGEDINUSERNAME];
      }

      return false;
    }

    static function LogOut() {
      session_start();
      $_SESSION = array();
      session_destroy();
    }

    static function CreateTable($aSQLConn = null) {
      if ($aSQLConn === null) {
        return SQLConnection::ExecuteQueryEx(AuthManager::cSQL_CREATE_TABLE);
      } else {
        return $aSQLConn->executeQuery(AuthManager::cSQL_CREATE_TABLE);
      }
    }

  }

?>