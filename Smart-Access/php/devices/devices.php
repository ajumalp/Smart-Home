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
         if (SQLConnection::ExecuteQueryEx("INSERT INTO devices (DEVICENAME, BOARDID, USERID, LAYOUTINDEX) VALUES('%s', %d, %d, %d)",
            $aParams[0], $aParams[1],
            AuthManager::getUserID(), $aParams[2])
         ) {
            echo cGEN_SUCCESS;
         } else {
            echo cGEN_FAILED;
         }
      }

      static function LoadFromDB($aParams) {
         echo SQLConnection::AsJSONEx("SELECT * FROM devices WHERE USERID = %d AND LAYOUTINDEX = %d", AuthManager::getUserID(), $aParams[0]);
      }

      static function DeleteFromDB($aParams) {
         if (SQLConnection::ExecuteQueryEx("DELETE FROM devices WHERE DEVICEID = %d AND USERID = %d", $aParams[0], AuthManager::getUserID())
         ) {
            echo cGEN_SUCCESS;
         } else {
            echo cGEN_FAILED;
         }
      }

      static function MoveTo($aParams) {
         if (SQLConnection::ExecuteQueryEx("UPDATE devices SET LAYOUTINDEX = %d WHERE DEVICEID = %d AND USERID = %d",
            $aParams[0], $aParams[1], AuthManager::getUserID())
         ) {
            echo cGEN_SUCCESS;
         } else {
            echo cGEN_FAILED;
         }
      }

   }
