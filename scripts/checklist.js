(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList (selector) {
    if (!selector) {
      throw new Errow('No selector Provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value;
      fn(email)
        .then(function () {
          this.removeRow(email);
        }.bind(this));
    }.bind(this));
  }

  CheckList.prototype.addRow = function (orders) {
    this.removeRow(orders.emailAddress);
    var rowElement = new Row(orders);
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function Row (orders) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      'type': 'checkbox',
      'value': orders.emailAddress
    });

    var description = orders.coffee + '-';
    if (orders.bulk) {
      description += orders.bulk + '-';
    }

    description += orders.strength + '份';
    description += '（' + orders.name + '-';
    description += orders.emailAddress + '）';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);