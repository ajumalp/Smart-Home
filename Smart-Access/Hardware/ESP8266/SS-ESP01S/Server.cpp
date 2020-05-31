/*
 * CoreUtils.h
 * Developed by Muhammad Ajmal P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 31-May-2020
 */

#include <Arduino.h>
#include <WiFiClient.h>
#include <ESP8266WiFi.h>
#include "Server.h"
#include "WebPage.h"

ESmartHomeServer::ESmartHomeServer() {
   FDlyWiFiConn.setDelay(3000);
}

void ESmartHomeServer::InitAll() {
  FServer.on("/", std::bind(&ESmartHomeServer::handleRoot, this));
  FServer.onNotFound(std::bind(&ESmartHomeServer::handleNotFound, this));

  FServer.on(F("/saveSett"), std::bind(&ESmartHomeServer::handleSave, this));
  FServer.on(F("/saveHotspot"), std::bind(&ESmartHomeServer::handleSaveHotspot, this));

  FServer.begin();
}

void ESmartHomeServer::connectToMyWiFi() {
  Serial.println(F("Connecing to my WiFi router for Internet Access"));
  while (true) {
    // Check WiFi connection only once in 500 milli sec { Ajmal }
    if (FDlyWiFiConn.canContinue()) {
      if (WiFi.status() == WL_CONNECTED) break;
      Serial.print('.');
    }

    // call handleClient, so that if there is any request to server it will handle
    handleClient();
  }

  Serial.println();
  Serial.println(F("WiFi connected"));
  Serial.print(F("IP address: "));
  Serial.println(WiFi.localIP());
}

void ESmartHomeServer::handleRoot() {
   FServer.send(200, "text/html", cWebPageServer);
}

void ESmartHomeServer::handleClient() {
   FServer.handleClient();
}

void ESmartHomeServer::handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += FServer.uri();
  message += "\nMethod: ";
  message += (FServer.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += FServer.args();
  message += "\n";
  for (uint8_t i = 0; i < FServer.args(); i++) {
    message += " " + FServer.argName(i) + ": " + FServer.arg(i) + "\n";
  }
  FServer.send(404, "text/plain", message);
}

void ESmartHomeServer::handleSave() {
  bool bWiFiSaved = false;
  String sTemp = FServer.arg(F("ssid"));
  sTemp.trim();
  if (sTemp.length() != 0) {
    char userName[sTemp.length() + 1];
    sTemp.toCharArray(userName, sTemp.length() + 1);

    sTemp = FServer.arg(F("psw"));
    sTemp.trim();
    char pass[sTemp.length() + 1];
    sTemp.toCharArray(pass, sTemp.length() + 1);

    WiFi.begin(userName, pass);
    FServer.send(200, "text/html", F("<HTML><HEAD></HEAD><BODY><CENTER><H1>Wi-Fi Settings Saved</H1></CENTER></BODY></HTML>"));
    Serial.println(F("Wi-Fi credentials updated."));
    connectToMyWiFi();
    bWiFiSaved = true;
  }

  if (!bWiFiSaved) {
    FServer.send(200, "text/html", F("<HTML><HEAD></HEAD><BODY><CENTER><H1>Wi-Fi Settings Not Changed</H1></CENTER></BODY></HTML>"));
    Serial.println(F("Wi-Fi credentials updated."));
  }
}

void ESmartHomeServer::handleSaveHotspot() {
  bool bHotspotSaved = false;
  String sTemp = FServer.arg(F("hp_ssid"));
  sTemp.trim();
  if (sTemp.length() != 0) {
    char userName[sTemp.length() + 1];
    sTemp.toCharArray(userName, sTemp.length() + 1);

    sTemp = FServer.arg(F("hp_psw"));
    sTemp.trim();
    if (sTemp.length() > 7) {
      char pass[sTemp.length() + 1];
      sTemp.toCharArray(pass, sTemp.length() + 1);
      bHotspotSaved = WiFi.softAP(userName, pass);
    } else {
      FServer.send(200, "text/html", F("<HTML><HEAD></HEAD><BODY><CENTER><H1>Hotspot password should be atleast 8 characters</H1></CENTER></BODY></HTML>"));
      Serial.println(F("Hotspot password should be atleast 8 characters"));
      return;
    }
  }

  if (!bHotspotSaved) {
    FServer.send(200, "text/html", F("<HTML><HEAD></HEAD><BODY><CENTER><H1>Hotspot Settings Not Changed</H1></CENTER></BODY></HTML>"));
    Serial.println(F("Hotspot credentials updated."));
  } else {
    FServer.send(200, "text/html", F("<HTML><HEAD></HEAD><BODY><CENTER><H1>Hotspot Settings Saved</H1></CENTER></BODY></HTML>"));
    Serial.println(F("Hotspot credentials updated."));
  }
}
