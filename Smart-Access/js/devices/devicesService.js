
/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

myApp.services.devices = {

  bindOnSaveListener: function (aControl) {
    alert('Done');
  },

  save: function (aData) {
    ons.notification.alert(aData.caption);
  }
};