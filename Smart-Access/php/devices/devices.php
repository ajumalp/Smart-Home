<?php

/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

   include_once __DIR__ . "/../auth/AuthManager.php";
   include_once __DIR__ . "/../Utils.php";

   Utils::ValidatePostData();
   $sFunctionName = $_POST['fnName'];
   $varArgs = $_POST['args'];

   Devices::{$sFunctionName}($varArgs);

   class Devices {

      static function saveDevice($aArgs) {
         if (SQLConnection::ExecuteQueryEx("INSERT INTO devices (DEVICENAME, BOARDID) VALUES('%s', %d)", $aArgs[0], $aArgs[1])) {
            echo cGEN_SUCCESS;
         } else {
            echo cGEN_FAILED;
         }
      }

   }
