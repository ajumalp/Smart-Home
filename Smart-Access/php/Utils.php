<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

namespace Utils;

use ES\Core\AuthManager;
use ES\Core\SQLConnection;
use InvalidArgumentException;

class Authentication {

      static function ValidatePostData() {
         if (!isset($_POST['sessionID']) || !isset($_POST['className']) || !isset($_POST['fnName']) || !isset($_POST['args'])) {
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

class StrHelper {

   public static function StartWith(string $source, string $startText): bool {
      return substr($source, 0, strlen($startText)) === $startText;
   }

   public static function EndWith(string $source, string $endText): bool {
      return substr($source, strlen($source) - strlen($endText), strlen($source)) === $endText;
   }

}