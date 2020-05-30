/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

myApp.controllers = {

  tabbarPage: function (page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function () {
      document.querySelector('#mainSplitter').left.toggle();
    };

    [].forEach.call(page.querySelectorAll('[component="button/add-control"]'), function (element) {
      element.onclick = function () {
        myApp.services.platform.changeTo('ios', function () {
          ons.openActionSheet({
            title: 'Select Control',
            cancelable: true,
            buttons: ['Switch', 'Push Button', 'Cancel']
          }).then(function (index) {
            switch (index) {
              case 0:
                myApp.Main.Navigator().pushPage('html/addSwitch.html', {
                  animation: 'lift'
                });
                break;
              case 1:
                break;
            }
          });
        });
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform
    // page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  menuPage: function (page) {
    [].forEach.call(page.querySelectorAll("[category-id^=main-menu-]"), myApp.services.categories.bindOnClickListener);
    // Change splitter animation depending on platform.
    document.querySelector('#mainSplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
    // Load the Home layout data { Ajmal }
    Gadgets.LoadData();
  },

  settingsPage: function (page) {

    myApp.services.JQPHP.postData("Options", "LoadFromDB",
      ['MQTT_'], function (obj, isSuccess, textstatus) {
        var varData = JSON.parse(obj);
        varData.forEach(function (aItem) {
          if (aItem.OPT_NAME === 'MQTT_HOST') page.querySelector('#mqtt-host-input').value = aItem.OPT_VALUE;
          else if (aItem.OPT_NAME === 'MQTT_PORT') page.querySelector('#mqtt-port-input').value = aItem.OPT_VALUE;
          else if (aItem.OPT_NAME === 'MQTT_PATH') page.querySelector('#mqtt-path-input').value = aItem.OPT_VALUE;
        });
      }
    );

    [].forEach.call(page.querySelectorAll('[component="button/save-settings"]'), function (element) {
      element.onclick = function () {
        var sMQTTHost = page.querySelector('#mqtt-host-input').value;
        var sMQTTPort = page.querySelector('#mqtt-port-input').value;
        var sMQTTPath = page.querySelector('#mqtt-path-input').value;

        myApp.services.JQPHP.postData('Options', 'SaveToDB',
          ['MQTT_HOST=' + sMQTTHost,
          'MQTT_PORT=' + sMQTTPort,
          'MQTT_PATH=' + sMQTTPath],
          function (obj, isSuccess, textstatus) {
            myApp.services.message.alert('Settings Saved');
          }
        );

        myApp.Main.Navigator().popPage();
      };
    });
  },

};
