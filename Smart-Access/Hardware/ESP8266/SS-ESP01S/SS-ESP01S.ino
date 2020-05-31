
/*
 * ESP01S-Smart-Switch-1/2/4 Channel
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 06-May-2020
 */

#include <PubSubClient.h>
#include "WebPage.h"
#include "Server.h"

const char cWiFiName[] = "SS-ESP01S-Relay";
const char cWiFiPass[] = "trytest123";

const String cDeviceID = "1";
// Enter a unique topic name to which this device subscribe
const String cMQTTSubTopic = "SmartHome/DevSub-" + cDeviceID;

const IPAddress cMQTTServerAddr (192, 168, 1, 125);
// const char cMQTTServerAddr[] = "mqtt.eclipse.org";
const int cMQTTServerPort = 1883;

const byte cRelayStateLow = LOW;
const byte cRelayStateHigh = HIGH;

// #define SERIAL_BAUD_RATE 9600
#define SERIAL_BAUD_RATE 115200

ESmartHomeServer eSHServer;
WiFiClient mqttWifi;
PubSubClient mqttClient(mqttWifi);

void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  while (!Serial);

  delay(100);
  EEPROM.begin(512);
  delay(500);

  InitAccessPoint();
  WiFi.setAutoConnect(true);

  // Set a call back function for MQTT. When a message is received, this function will be triggered
  mqttClient.setCallback(mqttCallback);

  delay(100);

  // Connect esp module to your wifi router
  eSHServer.connectToMyWiFi();

  // Update MQTT Server and Port
  updateMQTTDetails();
}

void loop() {
  // call handleClient, so that if there is any request to server it will handle
  eSHServer.handleClient();

  // Continously check MQTT connection and verify it's successful
  mqttReconnect();

  // This function internally check with the MQTT server for updation to the subscribed topic
  mqttClient.loop();
}

void InitAccessPoint() {
  Serial.println();
  Serial.println(F("Configuring access point..."));

  // Set WiFi Hotspot only if not exist { Ajmal }
  if (!readFromMem(1).equals("T")) {
    writeToMem(0, "T");
    WiFi.softAP(cWiFiName, cWiFiPass);
    Serial.println(F("Default Hotspot Settings Applied"));
  }

  IPAddress myIP = WiFi.softAPIP();
  Serial.print(F("AP IP address: "));
  Serial.println(myIP);
  eSHServer.InitAll();
  Serial.println(F("HTTP server started"));
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  Serial.println(F("MQTT message received"));
  String sMsg = "";
  for (int iCntr = 0; iCntr < length; iCntr++) {
    char chr = (char) payload[iCntr];
    sMsg += chr;
  }

  if (sMsg.equals("D0=ON")) sendRelayUpdateCommand(0, cRelayStateHigh);
  else if (sMsg.equals("D0=OFF")) sendRelayUpdateCommand(0, cRelayStateLow);
  else if (sMsg.equals("D1=ON")) sendRelayUpdateCommand(1, cRelayStateHigh);
  else if (sMsg.equals("D1=OFF")) sendRelayUpdateCommand(1, cRelayStateLow);
  else if (sMsg.equals("D2=ON")) sendRelayUpdateCommand(2, cRelayStateHigh);
  else if (sMsg.equals("D2=OFF")) sendRelayUpdateCommand(2, cRelayStateLow);
  else if (sMsg.equals("D3=ON")) sendRelayUpdateCommand(3, cRelayStateHigh);
  else if (sMsg.equals("D3=OFF")) sendRelayUpdateCommand(3, cRelayStateLow);
}

// Constatnts { Ajmal }
const byte cMsgRelayOn[] = {0xA2, 0xA3, 0xA4, 0xA5};
const byte cMsgRelayOff[] = {0xA1, 0xA2, 0xA3, 0xA4};

bool sendRelayUpdateCommand(int aPinNo, byte aState) {
  byte varRelayState[] = {0xA0, 0x01, 0x01, 0xA2};

  varRelayState[1] = aPinNo + 1;
  if (aState == cRelayStateHigh) {
    varRelayState[2] = 0x01;
    varRelayState[3] = cMsgRelayOn[aPinNo];
  } else {
    varRelayState[2] = 0x00;
    varRelayState[3] = cMsgRelayOff[aPinNo];
  }

  int iMsgLen = sizeof(varRelayState);
  if(Serial.write(varRelayState, iMsgLen) == iMsgLen) {
    delay(500);
    Serial.println(F("Relay Update Command Successful"));
    return true;
  }

  return false;
}

void updateMQTTDetails() {
  mqttClient.setServer(cMQTTServerAddr, cMQTTServerPort);
  Serial.println(F("MQTT details updated."));
}

void mqttReconnect() {
  if (mqttClient.connected()) {
    return;
  }

  Serial.print(F("Attempting MQTT connection..."));
  // Generate a random client ID. You can change this for better security
  String sClientID = "__ESMQTT_ClntID_" + String(random(0xffff), HEX);

  // for now simply use above generated Client ID as Client ID and user name.
  if (mqttClient.connect(sClientID.c_str())) {
    mqttClient.subscribe(cMQTTSubTopic.c_str());
    Serial.println(F("connected"));
  } else {
    Serial.print(F("failed, rc="));
    Serial.print(mqttClient.state());
    Serial.println(F(" try again in 3 seconds"));
    delay(3000);
  }
}
