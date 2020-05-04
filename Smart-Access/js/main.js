/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 30-Apr-2020
 */

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