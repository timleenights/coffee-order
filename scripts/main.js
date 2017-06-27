(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var CheckList = App.CheckList;
  // var myTruck = new Truck('Customer', new DataStore());  // 本地存储
  var myTruck = new Truck('Customer1', remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function () {
        checkList.addRow.call(checkList, data);
      },
      function () {
        alert('Server unreachable. Please Try again later.');
      });
  });

  formHandler.addInputHandler(Validation.isValidEmail);

  myTruck.printOrders(checkList.addRow.bind(checkList));

  // console.log(formHandler);
})(window);