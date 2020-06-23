
/*
 * CoreUtils.h
 * Developed by Muhammad Ajmal P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 07-June-2020
 */

#include "CharUtils.h"
#include "Client.h"

ESmartHomeClient:: ESmartHomeClient() {
   FFetchData = true;
   FClient.setTimeout(3000);
}

bool ESmartHomeClient::canFetchData() {
   return FFetchData;
}

void ESmartHomeClient::enableDataFetch() {
   FFetchData = true;
}

bool ESmartHomeClient::fetchData(String aUniqueDeviceID, String aData) {
   if (FFetchData == false) return false;
   FFetchData = false;

   // Prepare post data { Ajmal }
   String sPostData = "DATA=" + aUniqueDeviceID;
   if (aData != "") sPostData += cPipeSymbol + aData;
   Serial.println(F("Processing update requests"));
   return httpPostData(F("getSwitchStatesByDeviceID.php"), sPostData);
}

bool ESmartHomeClient::available() {
   return FClient.available();
}

int ESmartHomeClient::read() {
   return FClient.read();
}

bool ESmartHomeClient::httpGetData(String aFileName) {
   return httpSendData(cHTTP_REQUEST_TYPE_GET, aFileName, cEmptyStr);
}

bool ESmartHomeClient::httpPostData(String aFileName, String aPostData) {
   return httpSendData(cHTTP_REQUEST_TYPE_POST, aFileName, aPostData);
}

bool ESmartHomeClient::httpSendData(byte aRequestType, String aFileName, String aPostData) {
   FClient.stop();

   if (!FClient.connect(cSA_API_HOST, cSA_API_PORT.toInt())) {
      // if you didn't get a connection to the server { Ajmal }
      Serial.println(F("connection failed"));
      return false;
   }

   // if you get a connection, go forward { Ajmal }
   Serial.println(F("Connected to server."));
   Serial.println(F("Fetching data. Please wait . . . !"));

   // Make a HTTP request { Ajmal }
   if (aRequestType == cHTTP_REQUEST_TYPE_POST) FClient.print("POST /" + cSA_API_PATH);
   else FClient.print("GET /" + cSA_API_PATH);

   FClient.print(aFileName);
   FClient.println(F(" HTTP/1.1"));
   FClient.println("Host: " + cSA_API_HOST + ":" + cSA_API_PORT);
   FClient.println(F("Connection: close"));

   if (aRequestType == cHTTP_REQUEST_TYPE_POST) {
      FClient.println(F("Content-Type: application/x-www-form-urlencoded"));
      FClient.print(F("Content-Length: "));
      FClient.println(aPostData.length());
      FClient.println();
      FClient.println(aPostData);
   }
   FClient.println();

   Serial.println(F("Server request complete."));
   Serial.println();

   return true;
}