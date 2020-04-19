<?php

/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

   include_once __DIR__ . "/../auth/AuthManager.php";

   if (!isset($_POST['fnName']) || !isset($_POST['args'])) {
      exit;
   }

   $sFunctionName = $_POST['fnName'];
   $varArgs = $_POST['args'];

   Devices::{$sFunctionName}($varArgs);

   class Devices {

      static function saveDevice($aArgs) {
         if (SQLConnection::ExecuteQueryEx("INSERT INTO devices (DEVICENAME) VALUES('%s')", $aArgs[0])) {
            echo cGEN_SUCCESS;
         } else {
            echo cGEN_FAILED;
         }
      }

   }
