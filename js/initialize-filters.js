'use strict';

(function () {
  window.initializeFilters = function (element, callback) {
    var newFilter = element.value;
    callback(newFilter);
  };
})();
