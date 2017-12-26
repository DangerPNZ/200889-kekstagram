'use strict';
(function () {
  var picturesContainer = document.querySelector('.pictures');
  var filtersBlock = document.querySelector('.filters');
  var filtersRadioElements = filtersBlock.querySelectorAll('.filters-radio');
  var picturesElements = [];
  var initialData = [];
  var sortedData = [];
  var showFiltersBlock = function () {
    filtersBlock.classList.remove('filters-inactive');
  };


  var clearBlockPictures = function () {
    picturesContainer.innerHTML = '';
  };

  var fillBlockPictures = function (info) {
    info = info.slice();
    var fragment = document.createDocumentFragment();
    picturesElements = [];
    for (var i = 0; i < info.length; i++) {
      var data = info[i];
      data.id = i;
      var newPostElement = window.picture.create(data);
      picturesElements.push(newPostElement);
      fragment.appendChild(newPostElement);
    }
    picturesContainer.appendChild(fragment);
    addHandlers();
  };

  var fillBlockBySortedPictures = function (type) {
    var sortFunc;
    switch (type) {
      case window.constants.FILTER_TYPE.FILTER_POPULAR:
        sortFunc = window.utils.sortByLikes;
        break;
      case window.constants.FILTER_TYPE.FILTER_DISCUSSED:
        sortFunc = window.utils.sortByComments;
        break;
      case window.constants.FILTER_TYPE.FILTER_RANDOM:
        sortFunc = window.utils.sortRandom;
        break;
      default:
        sortFunc = null;
    }
    sortedData = sortFunc ? sortedData.sort(sortFunc) : initialData.slice();
    clearBlockPictures();
    fillBlockPictures(sortedData);
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
    window.preview.fill(sortedData[currentPictureIndex]);
    window.preview.closeBtn.focus();
    addCloseHandlers();
  };

  var addHandlers = function () {
    for (var x = 0; x < picturesElements.length; x++) {
      picturesElements[x].addEventListener('click', postClickHandler);
    }
  };

  var onSuccessHandler = function (data) {
    initialData = data;
    sortedData = initialData.slice();
    fillBlockPictures(data);
    showFiltersBlock();
  };

  var onErrorHandler = function (onError) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 50; margin: 0 auto; padding: 20px 0; text-align: center; background-color: yellow; color: #000; position: absolute; left: 0; top: 0; width: 100%; font-size: 30px; font-weight: 700; box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.5);';
    errorBlock.textContent = onError;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  window.backend.load(onSuccessHandler, onErrorHandler);

  filtersRadioElements.forEach(function (filterElement) {
    filterElement.addEventListener('change', function (event) {
      var sortButton = event.currentTarget;
      var typeSort = sortButton.id;
      window.debounce(function () {
        fillBlockBySortedPictures(typeSort);
      });
    });
  });

})();
