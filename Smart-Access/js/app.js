
/*
 * Developed by ajumalp
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
    if (varClassType === 'DevicesController') {
      varClass = myApp.controllers.devices;
    }

    if (varClass != null) {
      varClass[page.id](page);
    } else {
      throw new Error('Invalid Class Reference');
    }
  } else if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    if (document.querySelector('#menuPage')
      && document.querySelector('#pendingTasksPage')
      && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
      myApp.services.fixtures.forEach(function (data) {
        myApp.services.tasks.create(data);
      });
    }
  }
});
