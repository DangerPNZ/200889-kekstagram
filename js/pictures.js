'use strict';

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
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
    values[i].id = i;
  }
  return values;
};

var createPost = function (postInfo) {
  var templateContent = document.querySelector('#picture-template').content;
  var element = templateContent.cloneNode(true);
  element.querySelector('img').src = postInfo.url;
  element.querySelector('.picture-likes').textContent = postInfo.likes;
  element.querySelector('.picture-comments').textContent = postInfo.comments.length;
  element.querySelector('a').setAttribute('data-id', postInfo.id);
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
var galleryOverlay = document.querySelector('.gallery-overlay');
var closeGalleryBtn = galleryOverlay.querySelector('.gallery-overlay-close');

var fillGalleryOverlay = function (object) {
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('.gallery-overlay-image').src = object.url;
  galleryOverlay.querySelector('.likes-count').textContent = object.likes;
  galleryOverlay.querySelector('.comments-count').textContent = object.comments.length;
};

var removeCloseHandlers = function () {
  closeGalleryBtn.removeEventListener('click', clickCloseBtnHandler);
  closeGalleryBtn.removeEventListener('keydown', pressCloseBtnHandler);
  document.removeEventListener('keydown', escBtnHandler);
};

var clickCloseBtnHandler = function (event) {
  event.preventDefault();
  galleryOverlay.classList.add('hidden');
  removeCloseHandlers();
};

var pressCloseBtnHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    galleryOverlay.classList.add('hidden');
    removeCloseHandlers();
  }
};

var escBtnHandler = function (event) {
  if (event.keyCode === ESC_KEY_CODE) {
    galleryOverlay.classList.add('hidden');
    removeCloseHandlers();
  }
};

var addCloseHandlers = function () {
  closeGalleryBtn.addEventListener('click', clickCloseBtnHandler);
  closeGalleryBtn.addEventListener('keydown', pressCloseBtnHandler);
  document.addEventListener('keydown', escBtnHandler);
};

var postClickHandler = function (event) {
  event.preventDefault();
  var currentPictureIndex = event.currentTarget.getAttribute('data-id');
  fillGalleryOverlay(postsInfo[currentPictureIndex]);
  addCloseHandlers();
};

var addHandlers = function () {
  var picture = picturesContainer.querySelectorAll('.picture');
  for (var x = 0; x < picture.length; x++) {
    picture[x].addEventListener('click', postClickHandler);
  }
};

/* module4-task2 */
var uploadImageForm = document.querySelector('#upload-select-image');
var uploadImageInput = uploadImageForm.querySelector('#upload-file');
var uploadOverlay = uploadImageForm.querySelector('.upload-overlay');
var uploadCloseBtn = uploadImageForm.querySelector('.upload-form-cancel');
var effectSwitches = uploadImageForm.querySelectorAll('input[name="effect"]');
var scaleValueInput = uploadImageForm.querySelector('.upload-resize-controls-value');
var photo = uploadImageForm.querySelector('.effect-image-preview');
var initialScaleValue = parseInt(scaleValueInput.value, 10);
var hashtagsInput = uploadImageForm.querySelector('.upload-form-hashtags');
var descriptionInput = uploadImageForm.querySelector('.upload-form-description');
var activedEffect = null;
var labelNone = uploadImageForm.querySelector('label[for=upload-effect-none]');
var cleanEffects = function () {
  if (activedEffect) {
    photo.classList.remove(activedEffect);
    labelNone.focus();
  }
}

var returnInitialFormState = function () {
  setImageScale(parseInt(initialScaleValue, 10));
  scaleValueInput.value = initialScaleValue + '%';
  hashtagsInput.value = '';
  hashtagsInput.style.borderColor = 'initial';
  descriptionInput.value = '';
  cleanEffects();
};

var uploadChangeHandler = function () {
  uploadOverlay.classList.remove('hidden');
  addUploadCloseHandlers();
};

uploadImageInput.addEventListener('change', uploadChangeHandler);

var removeUploadCloseHandlers = function () {
  uploadCloseBtn.removeEventListener('click', clickUploadCloseBtnHandler);
  uploadCloseBtn.removeEventListener('keydown', pressUploadCloseBtnHandler);
  document.removeEventListener('keydown', escUploadBtnHandler);
};

var clickUploadCloseBtnHandler = function (event) {
  event.preventDefault();
  returnInitialFormState();
  uploadOverlay.classList.add('hidden');
  removeUploadCloseHandlers();
};

var pressUploadCloseBtnHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    returnInitialFormState();
    uploadOverlay.classList.add('hidden');
    removeUploadCloseHandlers();
  }
};

var escUploadBtnHandler = function (event) {
  if (event.keyCode === ESC_KEY_CODE) {
    returnInitialFormState();
    uploadOverlay.classList.add('hidden');
    removeUploadCloseHandlers();
  }
};

var addUploadCloseHandlers = function () {
  uploadCloseBtn.addEventListener('click', clickUploadCloseBtnHandler);
  uploadCloseBtn.addEventListener('keydown', pressUploadCloseBtnHandler);
  document.addEventListener('keydown', escUploadBtnHandler);
};


var setImageScale = function (val) {
  photo.style.transform = 'scale(' + (val / 100) + ')';
};

var changeImageScale = function () {
  var btnMinus = uploadImageForm.querySelector('.upload-resize-controls-button-dec');
  var btnPlus = uploadImageForm.querySelector('.upload-resize-controls-button-inc');
  var scaleChangeStep = 25;

  setImageScale(initialScaleValue);

  btnMinus.addEventListener('click', function () {
    var currentScaleValue = parseInt(scaleValueInput.value, 10);
    if (currentScaleValue > 25) {
      scaleValueInput.value = currentScaleValue - scaleChangeStep + '%';
      setImageScale(parseInt(scaleValueInput.value, 10));
    }
  });

  btnPlus.addEventListener('click', function () {
    var currentScaleValue = parseInt(scaleValueInput.value, 10);
    if (currentScaleValue < 100) {
      scaleValueInput.value = currentScaleValue + scaleChangeStep + '%';
      setImageScale(parseInt(scaleValueInput.value, 10));
    }
  });
};

var selectEffect = function (event) {
  if (activedEffect) {
    cleanEffects();
  }
  // var effect = event.currentTarget.id
  // effect = effect.slice(7)
  activedEffect = 'effect-' + event.currentTarget.value;
  photo.classList.add(activedEffect);
};

var addEffectSelectHandlers = function () {
  for (var a = 0; a < effectSwitches.length; a++) {
    effectSwitches[a].addEventListener('change', selectEffect);
  }
};


var getHashtags = function () {
  return hashtagsInput.value.split(/\s+/);
};

var controlHashtagsValidity = function () {

  var hashtags = getHashtags();

  var hasOverflowHashtagLength = hashtags.some(function (symb) {
    return symb.length > 20;
  });

  var uncorrectTag = hashtags.some(function (symb) {
    return symb[0] !== '#';
  });

  var hasRepeatHashtags = hashtags.some(function (tag) {
    return hashtags.indexOf(tag) !== hashtags.lastIndexOf(tag);
  });

  if (hashtags.length > 5 || hasOverflowHashtagLength || uncorrectTag || hasRepeatHashtags) {
    hashtagsInput.setCustomValidity('Поле заполненно некорректно');
    hashtagsInput.style.borderColor = 'red';
  } else {
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style.borderColor = 'initial';
  }
};

uploadImageForm.addEventListener('submit', controlHashtagsValidity);


fillBlockPictures(postsInfo);
addHandlers();
//
changeImageScale();
addEffectSelectHandlers();
