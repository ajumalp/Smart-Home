/*
 * CoreUtils.h
 * Developed by Muhammad Ajmal P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 31-May-2020
 */

#ifndef SERVER_H_
#define SERVER_H_

#include <ESP8266WebServer.h>
#include "CoreUtils.h"

class ESmartHomeServer {

   private:
      ESP8266WebServer FServer;
      EDelay FDlyWiFiConn;

   public:
      ESmartHomeServer();

      void InitAll();
      void connectToMyWiFi();

      void handleRoot();
      void handleClient();
      void handleSave();
      void handleNotFound();
      void handleSaveHotspot();

};

#endif