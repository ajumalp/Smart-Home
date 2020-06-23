
/*
 * CoreUtils.h
 * Developed by Muhammad Ajmal P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 07-June-2020
 */

#ifndef CLIENT_H_
#define CLIENT_H_

#include <ESP8266WiFi.h>

const byte cHTTP_REQUEST_TYPE_GET = 0;
const byte cHTTP_REQUEST_TYPE_POST = 1;

const IPAddress cSA_API_IPAddress (192, 168, 18, 11);
const String cSA_API_HOST = "192.168.18.11";
const String cSA_API_PORT = "8093";
const String cSA_API_PATH = "sa/GitRepo/trunk/Smart-Access/php/api/";

class ESmartHomeClient {

   private:
      bool FFetchData;
      WiFiClient FClient;

      bool httpGetData(String aFileName);
      bool httpPostData(String aFileName, String aPostData);
      bool httpSendData(byte aRequestType, String aFileName, String aPostData);

   public:
      ESmartHomeClient();
      bool canFetchData();
      void enableDataFetch();
      bool available();
      int read();
      bool fetchData(String aUniqueDeviceID, String aData);

};

#endif