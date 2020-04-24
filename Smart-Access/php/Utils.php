<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

namespace Utils;

use ES\Core\Auth\AuthManager;
use ES\Core\DBExpress\SQLConnection;
use InvalidArgumentException;

class Authentication {

      static function ValidatePostData() {
         if (!isset($_POST['sessionID']) || !isset($_POST['fnName']) || !isset($_POST['args'])) {
            throw new InvalidArgumentException();
         }
         return AuthManager::Validate($_POST['sessionID']);
      }

}

class SQL {

   public static function ResetAutoIncrement($aTableName) {
      SQLConnection::ExecuteQueryEx("ALTER TABLE '%s' AUTO_INCREMENT = 1", $aTableName);
    }

}