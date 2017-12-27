'use strict';
(function () {
  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var sortByLikes = function (a, b) {
    return b.likes - a.likes;
  };

  var sortByComments = function (a, b) {
    return b.comments.length - a.comments.length;
  };

  var sortRandom = function () {
    return 0.5 - Math.random();
  };

  window.utils = {
    getRandomValue: getRandomValue,
    sortByLikes: sortByLikes,
    sortByComments: sortByComments,
    sortRandom: sortRandom
  };
})();
