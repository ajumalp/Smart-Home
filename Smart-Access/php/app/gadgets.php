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

}
