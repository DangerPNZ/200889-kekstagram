'use strict';
(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayBtn = galleryOverlay.querySelector('.gallery-overlay-close');

  var fillGalleryOverlay = function (object) {
    galleryOverlay.classList.remove('hidden');
    galleryOverlay.querySelector('.gallery-overlay-image').src = object.url;
    galleryOverlay.querySelector('.likes-count').textContent = object.likes;
    galleryOverlay.querySelector('.comments-count').textContent = object.comments.length;
  };

  window.preview = {
    container: galleryOverlay,
    closeBtn: galleryOverlayBtn,
    fill: fillGalleryOverlay
  }
})();
