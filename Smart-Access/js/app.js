
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

window.myApp = {};

document.addEventListener('init', function (event) {
   var page = event.target;

   // Each page calls its own initialization controller.

   if (page.hasAttribute('eClassName')) {
      var varClassType = page.getAttribute('eClassName');

      var varClass = null;
      switch (varClassType) {
         case "DevicesController":
            varClass = myApp.controllers.devices;
            break;
         case "GadgetsController":
            varClass = myApp.controllers.gadgets;
            break;
      }

      if (varClass != null) {
         varClass[page.id](page);
      } else {
         throw new Error('Invalid Class Reference');
      }
   } else if (myApp.controllers.hasOwnProperty(page.id)) {
      myApp.controllers[page.id](page);
   }
});

myApp.Utils = {

   Main: {
      LayoutIndex: function () {
         return parseInt(document.getElementById('main-toobal-title').attributes['layoutIndex'].value);
      }
   },

   General: {
      BoolToChar: function (aBoolValue) {
         if (aBoolValue) return 'T';
         else return 'F';
      },

      CharToBool: function (aCharValue) {
         return (aCharValue === 'T' || aCharValue === 't');
      }
   }

}