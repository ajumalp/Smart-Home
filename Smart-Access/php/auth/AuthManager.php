<?php

/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

  include_once __DIR__ . "/../dbExpress/SQLConnection.php";
  include_once __DIR__ . "/../config.php";

  include_once "AuthManagerExceptions.php";

  class AuthManager {

    const eSecurityLevelNone = 0;
    const eSecurityLevelLow = 1;
    const eSecurityLevelMedium = 2;
    // const eSecurityLevelHigh = 3; // Todo { Ajmal }

    const cSESSION_SESSIONID_HASH = "es_sa_sessionID";
    const cSESSION_ISLOGGEDIN = "isLoggedIn";
    const cSESSION_LOGGEDINUSERID = "loggedInUserID";
    const cSESSION_LOGGEDINUSERNAME = "loggedInUserName";

    const cSQL_CREATE_TABLE = "CREATE TABLE " . cAUTH_TABLE . " (
                              USERID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              USERNAME VARCHAR(50) NOT NULL UNIQUE,
                              PASSWORD VARCHAR(500) NOT NULL,
                              CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP)";

    static function AddUser($aUserName, $aPassword) {
      if (empty($aUserName)) throw new InvalidUserException("No UserName");
      elseif (strlen(trim($aUserName)) < 5) throw new InvalidUserException("UserName must have atleast 5 characters");
      elseif (empty($aPassword)) throw new InvalidPasswordException("No Password");
      elseif(strlen(trim($aPassword)) < 6) throw new InvalidPasswordException("Password must have atleast 6 characters");

      $cSQL_INSERT_USER = "INSERT INTO " . cAUTH_TABLE . " (USERNAME, PASSWORD) VALUES ('%s', '%s')";

      $varPasswordHash = password_hash($aPassword, PASSWORD_DEFAULT);
      $varSQLConn = SQLConnection::New();
      try {
        return $varSQLConn->executeQuery($cSQL_INSERT_USER, $aUserName, $varPasswordHash);
      } finally {
        mysqli_close($varSQLConn);
      }
    }

    static function getSecurityLevel() {
      return AuthManager::eSecurityLevelMedium;
    }

    static function Login($aUserName, $aPassword, $aSQLConn = null) {
      $bResult = false;
      $iUserID = -1;
      $sUserName = '';

      $iUserNameLen = strlen(trim($aUserName));
      $iPasswordLen = strlen(trim($aPassword));
      if ($iUserNameLen < 5 || $iUserNameLen > 15) throw new InvalidUserException("Invalid UserName");
      elseif($iPasswordLen < 6 || $iPasswordLen > 12) throw new InvalidPasswordException("Invalid Password");

      $cSQL_SELECT_USER = "SELECT USERID, USERNAME, PASSWORD FROM " . cAUTH_TABLE . " WHERE USERNAME = '%s'";

      $bFreeSQLCnn = false;
      if ($aSQLConn === null) {
        $aSQLConn = SQLConnection::New();
        $bFreeSQLCnn = true;
      }

      try {
        $varQuery = sprintf($cSQL_SELECT_USER, $aUserName);
        $varResult = $aSQLConn->query($varQuery);
        if ($varRow = $varResult->fetch_assoc()) {
          $iUserID = $varRow['USERID'];
          $sUserName = $varRow['USERNAME'];
          $bResult = password_verify($aPassword, $varRow['PASSWORD']);
        }
      } catch(Exception $ex) {
        return false;
      } finally {
        if ($bFreeSQLCnn) {
          mysqli_close($aSQLConn);
        }
      }

      if ($bResult) {
        session_start();
        $_SESSION[AuthManager::cSESSION_ISLOGGEDIN] = true;
        $_SESSION[AuthManager::cSESSION_LOGGEDINUSERID] = $iUserID;
        $_SESSION[AuthManager::cSESSION_LOGGEDINUSERNAME] = $sUserName;
        if (AuthManager::getSecurityLevel() > AuthManager::eSecurityLevelLow) {
          $sSessionID = session_id();
          $_SESSION[AuthManager::cSESSION_SESSIONID_HASH] = password_hash($sSessionID, PASSWORD_DEFAULT);
          // Create another ID so that the above used ID is not availableavailable anymore { Ajmal }
          session_regenerate_id();
          return $sSessionID;
        }
      } else {
        try {
          AuthManager::Logout();
        } finally {
          throw new UnunauthorizedAccessException();
        }
      }

      return $bResult;
    }

    static function IsLoggedin($aSessionID = null) {
      $iSecurityLevel = AuthManager::getSecurityLevel();

      // If security level is none, return true always { Ajmal }
      if ($iSecurityLevel === AuthManager::eSecurityLevelNone) {
        return true;
      }

      // If security level is low or greater, we need to
      // start session and check loggin status { Ajmal }
      if ($iSecurityLevel >= AuthManager::eSecurityLevelLow) {
        session_start();
        if (!$_SESSION[AuthManager::cSESSION_ISLOGGEDIN]) {
          return false;
        } else if ($iSecurityLevel === AuthManager::eSecurityLevelLow) {
          return true;
        }
      }

      // If security level is medium, we need to check for session id { Ajmal }
      if ($iSecurityLevel >= AuthManager::eSecurityLevelMedium) {
        if ($aSessionID === null) return false;
        else if (password_verify($aSessionID, $_SESSION[AuthManager::cSESSION_SESSIONID_HASH])) {
          return true;
        }
      }

      return false;
    }

    static function Logout() {
      session_start();
      $_SESSION = array();
      session_destroy();
    }

    static function ValidateLogin($aSessionID = null) {
      if (!AuthManager::IsLoggedin($aSessionID)) {
        throw new UnunauthorizedAccessException();
      }

      return true;
    }

    static function CreateTable($aSQLConn = null) {
      if ($aSQLConn === null) {
        return SQLConnection::ExecuteQueryEx(AuthManager::cSQL_CREATE_TABLE);
      } else {
        return $aSQLConn->executeQuery(AuthManager::cSQL_CREATE_TABLE);
      }
    }

  }
