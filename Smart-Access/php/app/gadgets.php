<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 26-Apr-2020
 */

namespace ES\SA;

use ES\Core\AuthManager;
use ES\Core\SQLConnection;
use ES\Core\UnunauthorizedAccessException;

class Gadgets {

   static function IsMyGadget($aGadgetID): bool {
      $bResult = false;
      SQLConnection::FetchRowsEx("SELECT USERID FROM devices D LEFT JOIN gadgets G ON G.DEVICEID = D.DEVICEID WHERE G.GADGETID = %d LIMIT 1",
         $aGadgetID, function ($aRow) use (&$bResult) {
         $bResult = $aRow['USERID'] === AuthManager::getUserID();
      });
      return $bResult;
   }

   static function SaveItemToDB($aParams) {
      if (!Devices::IsMyDevice($aParams[1])) {
         throw new UnunauthorizedAccessException();
      }

      $bIsInverted = $aParams[5];
      $sValue = "NF";
      if ($bIsInverted === 'T') $sValue = "IT";
      if (1 === SQLConnection::ExecuteQueryEx("INSERT INTO gadgets (GADGETNAME, DEVICEID, PINTYPE, LAYOUTINDEX, HIDEPAIR, INVERTED, VALUE) VALUES ('%s', %d, '%s', %d, '%s', '%s', '%s')",
         $aParams[0], $aParams[1], $aParams[2], $aParams[3], $aParams[4], $bIsInverted, $sValue)
      ) {
         echo cGEN_SUCCESS;
      } else {
         echo SQLConnection::LastError();
      }
   }

   static function LoadFromDB($aParams) {
      echo SQLConnection::AsJSONEx("SELECT G.*, D.BOARDID, D.DEVICENAME FROM gadgets G LEFT JOIN devices D ON D.DEVICEID = G.DEVICEID WHERE D.USERID = %d AND G.LAYOUTINDEX = %d ORDER BY D.DEVICENAME",
         AuthManager::getUserID(), $aParams[0]
      );
   }

   static function UpdateSwitchState($aParams) {
      if (!Gadgets::IsMyGadget($aParams[1])) {
         throw new UnunauthorizedAccessException();
      }

      if (1 === SQLConnection::ExecuteQueryEx("UPDATE gadgets SET VALUE = '%s' WHERE GADGETID = %d AND PINTYPE = '%s'",
         $aParams[0], $aParams[1], $aParams[2])
      ) {
         echo cGEN_SUCCESS;
      } else {
         echo SQLConnection::LastError();
      }
   }

   static function ImageList($aParams) {
      // is_dir("../")
   }

}
