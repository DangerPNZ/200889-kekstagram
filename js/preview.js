(function () {
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
    if (event.keyCode === window.constants.ENTER_KEY_CODE) {
      galleryOverlay.classList.add('hidden');
      removeCloseHandlers();
    }
  };

  var escBtnHandler = function (event) {
    if (event.keyCode === window.constants.ESC_KEY_CODE) {
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
  addHandlers();
})();
