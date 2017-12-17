'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var postsInfo = window.data.generatePostInfo();

  var fillBlockPictures = function (info) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < info.length; i++) {
      var postInfo = info[i];
      var newPostElement = window.data.createPost(postInfo);
      fragment.appendChild(newPostElement);
    }
    picturesContainer.appendChild(fragment);
  };
  fillBlockPictures(postsInfo);
})();
