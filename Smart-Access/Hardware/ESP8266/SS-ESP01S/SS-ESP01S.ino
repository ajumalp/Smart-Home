
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
#include "Client.h"
#include "CharUtils.h"

const char cWiFiName[] = "SS-ESP01S-Relay";
const char cWiFiPass[] = "trytest123";

const String cDeviceID = "1";
// Enter a unique topic name to which this device subscribe
const String cMQTTSubTopic = "SmartHome/DevSub-" + cDeviceID;

const IPAddress cMQTTServerAddr (192, 168, 18, 11);
// const char cMQTTServerAddr[] = "mqtt.eclipse.org";
const int cMQTTServerPort = 1883;

const byte cRelayStateLow = LOW;
const byte cRelayStateHigh = HIGH;

// Don't forget to chnage Baud Rate to 9600 for 1 Channel ESP01S Relay Board { Ajmal }
// #define SERIAL_BAUD_RATE 9600
#define SERIAL_BAUD_RATE 115200

ESmartHomeServer eSHServer;
ESmartHomeClient eSHClient;
WiFiClient mqttWifi;
PubSubClient mqttClient(mqttWifi);

String sKey, sData;

void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  while (!Serial);

  resetData();

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
  eSHServer.OnMQTTTopicChanged(EventMQTTTopicChanged);

  // Update MQTT Server and Port
  updateMQTTDetails();
}

void EventMQTTTopicChanged() {
  mqttClient.disconnect();
  mqttReconnect();
}

void loop() {
  // call handleClient, so that if there is any request to server it will handle
  eSHServer.handleClient();

  // Continously check MQTT connection and verify it's successful
  mqttReconnect();

  // This function internally check with the MQTT server for updation to the subscribed topic
  mqttClient.loop();

  if (!processWebResponds()) {
    eSHClient.fetchData("{MYUID}", "NOData");
  }
}

bool processWebResponds() {
  if (!eSHClient.available()) return false;

  char ch = eSHClient.read();
  processData(ch);

  return true;
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

void processMessage(String aKey, String aData) {
  Serial.print(F("Key: "));
  Serial.print(aKey);
  Serial.print(F(", Data: "));
  Serial.println(aData);

  String sPinIndex = "";
  if (aKey.startsWith("_PTYPE_D")) {
    sPinIndex = aKey.substring(8);
    if (aData.equals("ON")) sendRelayUpdateCommand(sPinIndex.toInt(), cRelayStateHigh);
    else sendRelayUpdateCommand(sPinIndex.toInt(), cRelayStateLow);
  }
}

void processData(char chr) {
  if ((chr == cNewLineChr) || (chr == cReturnChr)) {
    if (!sKey.equals(cEmptyStr)) {
      processMessage(sKey, sData);
    }
    resetData();
  } else if (chr == cEqualTo) {
    sKey = sData;
    sData = cEmptyStr;
  } else {
    sData += chr;
  }
}

void resetData() {
  sKey = cEmptyStr;
  sData = cEmptyStr;
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  Serial.println(F("MQTT message received"));
  String sMsg = "";
  for (int iCntr = 0; iCntr < length; iCntr++) {
    char chr = (char) payload[iCntr];
    sMsg += chr;
  }

  // We received a notification, now fetch data from server { Ajmal }
  eSHClient.enableDataFetch();
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
    mqttClient.subscribe(getMQTTTopicName().c_str());
    Serial.println(F("connected"));
  } else {
    Serial.print(F("failed, rc="));
    Serial.print(mqttClient.state());
    Serial.println(F(" try again in 1 second"));
    delay(1000);
  }
}

String getMQTTTopicName() {
  String sTopicName = readFromMem(2);
  sTopicName.trim();
  if (!sTopicName.equals(""))
    return sTopicName;

  return cMQTTSubTopic;
}
