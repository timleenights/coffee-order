(function (window) {
  'use strict';
  var App = window.App || {};

  function DataStore () {
    console.log('running the DataStroe function');
    this.data = {};
  }

  function promiseResolveWith (value) {
    return new Promise(function (resolve, reject) {
      resolve(value);
    });
  }

  DataStore.prototype.add = function (key, val) {
    return promiseResolveWith(null);
  }

  DataStore.prototype.get = function (key) {
    return promiseResolveWith(this.data[key]);
  }

  DataStore.prototype.getAll = function () {
    return promiseResolveWith(this.data);
  }

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return promiseResolveWith(null);
  }

  App.DataStore = DataStore;
  window.App = App;
})(window);