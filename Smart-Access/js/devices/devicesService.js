
myApp.services.devices = {

  bindOnSaveListener: function (aControl) {
    alert('Done');
  },

  save: function (aData) {
    ons.notification.alert(aData.caption);
  }
};