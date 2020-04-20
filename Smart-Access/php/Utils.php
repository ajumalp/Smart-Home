<?php

/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

class Utils {

      static function ValidatePostData() {
         if (!isset($_POST['sessionID']) || !isset($_POST['fnName']) || !isset($_POST['args'])) {
            throw new InvalidArgumentException();
         }
         return AuthManager::ValidateLogin($_POST['sessionID']);
      }

   }