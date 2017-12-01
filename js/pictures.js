'use strict';

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// var compareRandom = function () {
//   return Math.random() > 0.5;
// };

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

var generatePostInfo = function () {
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
  }
  return values;
};

var createPost = function (postInfo) {
  var templateContent = document.querySelector('#picture-template').content;
  var element = templateContent.cloneNode(true);
  element.querySelector('img').src = postInfo.url;
  element.querySelector('.picture-likes').textContent = postInfo.likes;
  element.querySelector('.picture-comments').textContent = postInfo.comments.length;
  return element;
};

var picturesContainer = document.querySelector('.pictures');

var fillBlockPictures = function (info) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < info.length; i++) {
    var postInfo = info[i];
    var newPostElement = createPost(postInfo);
    fragment.appendChild(newPostElement);
  }
  picturesContainer.appendChild(fragment);
};

var postsInfo = generatePostInfo();

// var selectImage = function () {
//   var galleryOverlay = document.querySelector('.gallery-overlay');
//   var galleryImage = galleryOverlay.querySelector('.gallery-overlay-preview img');
//   picturesContainer.addEventListener('click', function (event) {
//     if (event.target.closest('.picture')) {
//       event.preventDefault();
//       galleryOverlay.classList.remove('hidden');
//       galleryImage.src = event.target.src;
//     }
//   });
// };


var selectImage = function () {
  var picture = picturesContainer.querySelectorAll('.picture');

  var postClickHandler = function (event) {
    event.preventDefault();
    console.log(x);
    var elementIndex = x;
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryImage = galleryOverlay.querySelector('.gallery-overlay-preview img');
    galleryOverlay.classList.remove('hidden');
    galleryImage.src = postsInfo[elementIndex].url;
  };
  for (var x = 0; x < picture.length; x++) {
    picture[x].addEventListener('click', postClickHandler);
  }

};


// var fillGalleryOverlay = function (object) {
//   var galleryOverlay = document.querySelector('.gallery-overlay');
//   galleryOverlay.classList.remove('hidden');
//   galleryOverlay.querySelector('.gallery-overlay-image').src = object.url;
//   galleryOverlay.querySelector('.likes-count').textContent = object.likes;
//   galleryOverlay.querySelector('.comments-count').textContent = object.comments.length;
// };

fillBlockPictures(postsInfo);

selectImage();
