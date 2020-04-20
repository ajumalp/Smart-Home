<?php

   class Utils {

      static function ValidatePostData() {
         if (!isset($_POST['sessionID']) || !isset($_POST['fnName']) || !isset($_POST['args'])) {
            throw new InvalidArgumentException();
         }
         return AuthManager::ValidateLogin($_POST['sessionID']);
      }

   }