<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 29-May-2020
 */

namespace ES\SA;

use ES\Core\SQLConnection;

class Options {

   static function LoadFromDB($aParams) {
      echo SQLConnection::AsJSONEx("SELECT * FROM options WHERE OPT_NAME LIKE '%s%%'", $aParams[0]);
   }

   static function SaveToDB($aParams) {

      SQLConnection::New(function ($sqlConn) use ($aParams) {
         $sqlConn->autocommit(false);
         try {
            foreach($aParams as $aParam) {
               $aParamPair = explode("=", $aParam);
               $varQuery = sprintf("UPDATE options SET OPT_VALUE = '%s' WHERE OPT_NAME = '%s'", $aParamPair[1], $aParamPair[0]);
               $sqlConn->query($varQuery);
            }
            $sqlConn->autocommit(true);
         } catch (\Throwable $th) {
            $sqlConn->rollback();
            $sqlConn->autocommit(true);
         }
      });

   }

}