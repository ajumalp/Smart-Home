/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 30-Apr-2020
 */

window.onload = () => {
   'use strict';

   if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
   }
}

var showTemplateDialog = function () {
   var dialog = document.getElementById('my-dialog');

   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog.html',
         { append: true }).then(function (dialog) {
            dialog.show();
         });
   }
};

var hideDialog = function (id) {
   document.getElementById(id).hide();
};

myApp.Main = {

   LayoutIndex: function () {
      return parseInt(document.getElementById('main-toobal-title').attributes['layoutIndex'].value);
   },

   Navigator: function () {
      return document.querySelector('#mainNavigator');
   },

   MQTTClient: function () {
      myApp.services.JQPHP.postData("Options", "LoadFromDB",
         ['MQTT_'], function (obj, isSuccess, textstatus) {
            var sMQTTHost = ''; var sMQTTPort = ''; var sMQTTPath = '';

            var varData = JSON.parse(obj);
            varData.forEach(function (aItem) {
               if (aItem.OPT_NAME === 'MQTT_HOST') sMQTTHost = aItem.OPT_VALUE;
               else if (aItem.OPT_NAME === 'MQTT_PORT') sMQTTPort = aItem.OPT_VALUE;
               else if (aItem.OPT_NAME === 'MQTT_PATH') sMQTTPath = aItem.OPT_VALUE;
            });

            if (sMQTTHost !== '') {
               var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
               mqttClient = new Paho.MQTT.Client(sMQTTHost, Number(sMQTTPort), sMQTTPath, clientId);
               function onConnect() { mqttClient.subscribe("smarthome/notification"); }
               mqttClient.connect({ onSuccess: onConnect });
               mqttClient.onConnectionLost = function (responseObject) { console.log("Connection Lost: " + responseObject.errorMessage); }
               mqttClient.onMessageArrived = function (message) {
                  Gadgets.LoadData(myApp.Main.LayoutIndex());
               }
            }
         }
      );
   }

};

myApp.UI = {

   GadgetList: function () {
      return document.getElementById("main-gadget-list");
   },

   CreateListItem: function () {
   }

};

myApp.Utils = {

   General: {
      BoolToChar: function (aBoolValue) {
         if (aBoolValue) return 'T';
         else return 'F';
      },

      CharToBool: function (aCharValue) {
         return (aCharValue === 'T' || aCharValue === 't');
      }
   }

};