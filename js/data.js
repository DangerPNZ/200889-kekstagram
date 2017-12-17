'use strict';

(function () {

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var addRandomComments = function (comments) {
    var randomComments = [];
    var commentSum = getRandomValue(1, 2);
    for (var j = 0; j < commentSum; j++) {
      var commentIndex = Math.floor(Math.random() * comments.length);
      randomComments[j] = comments[commentIndex];
    }
    return randomComments;
  };

  var getPhotos = function () {
    var maxPhotos = 25;
    var photos = [];
    for (var i = 0; i < maxPhotos; i++) {
      photos[i] = i + 1;
    }
    // сортировка в случайном порядке
    // photos.sort(compareRandom);
    return photos;
  };

  window.data = {
    generatePostInfo: function () {
      var photos = getPhotos();// [1, 2, 3, 4, 5, 6... 25]
      var values = [];
      var commentsList = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
      ];

      for (var i = 0; i < 25; i++) {
        values[i] = {};
        values[i].url = 'photos/' + photos[i] + '.jpg';
        values[i].likes = getRandomValue(15, 200);
        values[i].comments = addRandomComments(commentsList);
        values[i].id = i;
      }
      return values;
    },

    createPost: function (postInfo) {
      var templateContent = document.querySelector('#picture-template').content;
      var element = templateContent.cloneNode(true);
      element.querySelector('img').src = postInfo.url;
      element.querySelector('.picture-likes').textContent = postInfo.likes;
      element.querySelector('.picture-comments').textContent = postInfo.comments.length;
      element.querySelector('a').setAttribute('data-id', postInfo.id);
      return element;
    }
  };

})();
