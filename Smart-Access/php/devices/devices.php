<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

namespace ES\SA\Devices;

use ES\Core\DBExpress\SQLConnection;
use Utils\Authentication;

   Authentication::ValidatePostData();
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
