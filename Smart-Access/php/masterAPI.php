<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

namespace ES\SA;

include_once "auth/AuthManager.php";
include_once "app/devices.php";
include_once "app/gadgets.php";
include_once "Utils.php";

use ES\Core\AuthManager;
use ES\Core\UnunauthorizedAccessException;
use InvalidArgumentException;
use Utils\StrHelper;

// For Dynamic Classes { Ajmal }

   $varPostData = PostData::Validate();
   try {
      // Call the static function in that class with parameters as args { Ajmal }
      $sclassName = $varPostData->getClassName();
      $sclassName::{$varPostData->getFunctionName()}($varPostData->getParameters());
   } finally {
      $varPostData = null;
   }

   class PostData {

      const cSESSION_ID = 'sessionID';
      const cCLASS_NAME = 'className';
      const cFUNCTION_NAME = 'functionName';
      const cPARAMETERS = 'parameters';
      const cPOSTDATA = [
         PostData::cSESSION_ID,
         PostData::cCLASS_NAME,
         PostData::cFUNCTION_NAME,
         PostData::cPARAMETERS
      ];

      public $sessionID;
      public $className;
      public $functionName;
      public $parameters;

      static function Validate(): PostData {
         $varPData = new PostData();

         foreach(postData::cPOSTDATA as $postData) {
            if (isset($_POST[$postData])) {
               $varPData->setData($postData, $_POST[$postData]);
            } else {
               throw new InvalidArgumentException('Parameter [' . $postData . '] not found');
            }
         }

         if ($varPData->getFunctionName() === 'getSecurityLevel') {
            return $varPData;
         } else if (AuthManager::Validate($varPData->getSessionID())) {
            return $varPData;
         } else {
            throw new UnunauthorizedAccessException();
         }
      }

      function getSessionID(): string { return $this->sessionID; }
      function getFunctionName(): string { return $this->functionName; }
      function getParameters() { return $this->parameters; }

      function getClassName(): string {
         // Check if namespace is already included { Ajmal }
         if (StrHelper::StartWith($this->className, "ES\\")) {
            return $this->className;
         } else {
            return "ES\\SA\\" . $this->className;
         }
      }

      function setData(string $aDataType, $aValue) {
         // The $ before aDataType is to assign value to the
         // variable of name in aDataType { Ajmal }
         $this->$aDataType = $aValue;
      }

   }