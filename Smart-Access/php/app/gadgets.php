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
use Utils\StrHelper;

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
      if (1 === SQLConnection::ExecuteQueryEx("INSERT INTO gadgets (GADGETNAME, DEVICEID, PINTYPE, LAYOUTINDEX, HIDEPAIR, INVERTED, VALUE, IMAGECODE) VALUES ('%s', %d, '%s', %d, '%s', '%s', '%s', '%s')",
         $aParams[0], $aParams[1], $aParams[2], $aParams[3], $aParams[4], $bIsInverted, $sValue, $aParams[6])
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

   // We consider the name of all images is a number in order
   // So the last image name is considered as the count { Ajmal }
   static function ImageCount() {
      $iResult = 0;
      $dir = "../images/gadget/";
      if (is_dir($dir)) {
         if ($dh = opendir($dir)) {
            while (($fileName = readdir($dh)) !== false){
               $fileName = strtolower($fileName);
               if (StrHelper::EndWith($fileName, ".png")) {
                  $iFileName = (int) str_replace(".png", "", $fileName);
                  if ($iFileName > $iResult) {
                     $iResult = $iFileName;
                  }
               }
           }
           closedir($dh);
         }
      }
      echo $iResult;
   }

   static function DeleteFromDB($aParams) {
      if (!Gadgets::IsMyGadget($aParams[0])) {
         throw new UnunauthorizedAccessException();
      }

      if (1 === SQLConnection::ExecuteQueryEx("DELETE FROM gadgets WHERE GADGETID = %d", $aParams[0])) {
         echo cGEN_SUCCESS;
      } else {
         echo SQLConnection::LastError();
      }
   }

}
