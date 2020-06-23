
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

typedef void (*OnMQTTTopicChanged_t)(void);

class ESmartHomeServer {

   private:
      EDelay FDlyWiFiConn;
      ESP8266WebServer FServer;
      OnMQTTTopicChanged_t FMQTTTopicChangeHandler;

      void handleRoot();
      void handleSave();
      void handleNotFound();
      void handleSaveHotspot();
      void handleSaveTopic();

   public:
      ESmartHomeServer();
      void InitAll();
      void connectToMyWiFi();
      void handleClient();
      void OnMQTTTopicChanged(OnMQTTTopicChanged_t aValue);

};

#endif