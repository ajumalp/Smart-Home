<?php

/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

namespace ES\Core;

use Exception;

include_once "AuthManager.php";

   if ($_POST['fnName'] === 'login') {
      try {
         echo AuthManager::Login($_POST['userName'], $_POST['password']);
      } catch (Exception $ex) {
         echo "false";
      }
   } else if ($_POST['fnName'] === 'register') {
      try {
         echo AuthManager::AddUser($_POST['userName'], $_POST['password']);
      } catch (Exception $ex) {
         echo "false";
      }
   }
