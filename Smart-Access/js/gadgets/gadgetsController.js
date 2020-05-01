/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 26-Apr-2020
 */

myApp.controllers.gadgets = {

   addSwitchPage: function (page) {
      Gadgets.LoadAddSwitchPage(page);
      [].forEach.call(page.querySelectorAll('[component="button/save-switch"]'), function (element) {
         element.onclick = function () {
            var sCaption = page.querySelector('#caption-input').value;
            var varDevice = page.querySelector('#device-select');
            if (sCaption) {
               Gadgets.SaveSwitch({
                  caption: sCaption,
                  deviceid: varDevice.options[varDevice.selectedIndex].getAttribute('deviceid'),
                  boardtype: varDevice.options[varDevice.selectedIndex].getAttribute('boardtype'),
                  pintype: page.querySelector('#pintype-select').value,
                  hidepair: page.querySelector('#hidePair-check').checked,
                  inverted: page.querySelector('#inverted-check').checked
               });
               myApp.Main.Navigator().popPage();
            } else {
               myApp.services.message.alert('You must enter caption');
            }
         };

         element.show && element.show();
      });
   },
}
