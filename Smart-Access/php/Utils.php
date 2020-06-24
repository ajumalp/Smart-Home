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

class General {

   public static function GenGUIDv4Ex($data) {
      assert(strlen($data) == 16);
  
      $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
      $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
  
      return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
    
    public static function GenGUIDv4() {
      return General::GenGUIDv4Ex(openssl_random_pseudo_bytes(16)); 
    }

}