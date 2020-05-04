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
    // Set button functionality to save a new task.
    [].forEach.call(page.querySelectorAll('[component="button/save-task"]'), function (element) {
      element.onclick = function () {
        var newTitle = page.querySelector('#title-input').value;

        if (newTitle) {
          // If input title is not empty, create a new task.
          myApp.services.tasks.create({
            title: newTitle,
            category: page.querySelector('#category-input').value,
            description: page.querySelector('#description-input').value,
            highlight: page.querySelector('#highlight-input').checked,
            urgent: page.querySelector('#urgent-input').checked
          });

          // Set selected category to 'All', refresh and pop page.
          document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
          document.querySelector('#default-category-list ons-list-item').updateCategoryView();
          myApp.Main.Navigator().popPage();

        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('You must provide a task title.');
        }
      };
    });
  },

};
