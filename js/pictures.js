'use strict';
var values = [];
var likeValue;
var commentsList = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var commentSum;
var i = 0;
var templateContent = document.querySelector('#picture-template').content;
var picturesContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var getRandomLikesValue = function (min, max) {
  likeValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return likeValue;
};

var getCommentSum = function (min, max) {
  commentSum = Math.floor(Math.random() * (max - min + 1)) + min;
  return commentSum;
};

var addComment = function () {
  getCommentSum(1, 2);
  for (var j = 0; j < commentSum; j++) {
    var commentIndex = Math.floor(Math.random() * commentsList.length);
    values[i].comments[j] = commentsList[commentIndex];
  }
};


var setValue = function () {
  for (; i < 25; i++) {
    getRandomLikesValue(15, 200);
    values[i] = {};
    values[i].url = 'photos/' + (i + 1) + '.jpg';
    values[i].likes = likeValue;
    values[i].comments = [];
    addComment();
  }
  return values;
};

setValue();

for (; i < 25; i++) {
  var element = templateContent.cloneNode(true);
  var elementImage = element.querySelector('img');
  var elementPictureLikes = element.querySelector('.picture-likes');
  var picturesCommentsSum = element.querySelector('.picture-comments');
  elementImage.setAttribute('src', values[i].url);
  elementPictureLikes.textContent = values[i].likes;
  picturesCommentsSum.textContent = values[i].comments.length;
  picturesContainer.appendChild(element);
}
