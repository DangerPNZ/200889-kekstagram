'use strict';
(function () {
  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.utils = {
    getRandomValue: getRandomValue
  };
})();
