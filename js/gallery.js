'use strict';
(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictures = [];
  var postsInfo = window.data.posts;

  var fillBlockPictures = function (info) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < info.length; i++) {
      var postInfo = info[i];
      var newPostElement = window.picture.create(postInfo);
      pictures.push(newPostElement);
      fragment.appendChild(newPostElement);
    }
    picturesContainer.appendChild(fragment);
  };

  var removeCloseHandlers = function () {
    window.preview.closeBtn.removeEventListener('click', clickCloseBtnHandler);
    window.preview.closeBtn.removeEventListener('keydown', pressCloseBtnHandler);
    document.removeEventListener('keydown', escBtnHandler);
  };

  var clickCloseBtnHandler = function (event) {
    event.preventDefault();
    window.preview.container.classList.add('hidden');
    removeCloseHandlers();
  };

  var pressCloseBtnHandler = function (event) {
    if (event.keyCode === window.constants.ENTER_KEY_CODE) {
      window.preview.container.classList.add('hidden');
      removeCloseHandlers();
    }
  };

  var escBtnHandler = function (event) {
    if (event.keyCode === window.constants.ESC_KEY_CODE) {
      window.preview.container.classList.add('hidden');
      removeCloseHandlers();
    }
  };

  var addCloseHandlers = function () {
    window.preview.closeBtn.addEventListener('click', clickCloseBtnHandler);
    window.preview.closeBtn.addEventListener('keydown', pressCloseBtnHandler);
    document.addEventListener('keydown', escBtnHandler);
  };

  var postClickHandler = function (event) {
    event.preventDefault();
    var currentPictureIndex = event.currentTarget.getAttribute('data-id');
    window.preview.fill(postsInfo[currentPictureIndex]);
    window.preview.closeBtn.focus();
    addCloseHandlers();
  };

  var addHandlers = function () {
    for (var x = 0; x < pictures.length; x++) {
      pictures[x].addEventListener('click', postClickHandler);
    }
  };

  fillBlockPictures(postsInfo);
  addHandlers();

})();
