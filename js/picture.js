'use strict';
(function () {

  var create = function (postInfo) {
    var templateContent = document.querySelector('#picture-template').content;
    var fragment = templateContent.cloneNode(true);
    fragment.querySelector('img').src = postInfo.url;
    fragment.querySelector('.picture-likes').textContent = postInfo.likes;
    fragment.querySelector('.picture-comments').textContent = postInfo.comments.length;
    fragment.querySelector('a').setAttribute('data-id', postInfo.id);
    var element = fragment.querySelector('a.picture');
    return element;
  };

  window.picture = {
    create: create
  };
})();
