<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

namespace ES\SA;

use ES\Core\AuthManager;
use ES\Core\SQLConnection;

class Devices {

      static function SaveItemToDB($aParams) {
         if (SQLConnection::ExecuteQueryEx("INSERT INTO devices (DEVICENAME, BOARDID, USERID) VALUES('%s', %d, %d)", $aParams[0], $aParams[1], AuthManager::getUserID())) {
            echo cGEN_SUCCESS;
         } else {
            echo cGEN_FAILED;
         }
      }

      static function LoadFromDB($aParams) {
         echo SQLConnection::AsJSONEx("SELECT * FROM devices WHERE USERID = %d AND LAYOUTINDEX = %d", AuthManager::getUserID(), $aParams[0]);
      }

   }
