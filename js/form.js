'use strict';
(function () {
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadImageInput = uploadImageForm.querySelector('#upload-file');
  var uploadOverlay = uploadImageForm.querySelector('.upload-overlay');

  var photo = uploadImageForm.querySelector('.effect-image-preview');
  var hashtagsInput = uploadImageForm.querySelector('.upload-form-hashtags');
  var uploadFormDescription = uploadImageForm.querySelector('.upload-form-description');
  var uploadButtonSubmit = uploadImageForm.querySelector('.upload-form-submit');
  var descriptionInput = uploadImageForm.querySelector('.upload-form-description');
  var uploadCloseBtn = uploadImageForm.querySelector('.upload-form-cancel');
  var effectSwitches = uploadImageForm.querySelectorAll('input[name="effect"]');

  var effectNone = uploadImageForm.querySelector('#upload-effect-none');
  var uploadEffectLevel = uploadImageForm.querySelector('.upload-effect-level');
  var pinEffectSaturation = uploadEffectLevel.querySelector('.upload-effect-level-pin');
  var levelEffectBar = uploadEffectLevel.querySelector('.upload-effect-level-val');
  var inputEffectSaturation = uploadEffectLevel.querySelector('.upload-effect-level-value');

  var activedEffect = null;

  var setImageScale = function (val) {
    photo.style.transform = 'scale(' + (val / 100) + ')';
  };

  var clearEffects = function () {
    if (activedEffect) {
      photo.classList.remove(activedEffect);
      effectNone.checked = true;
      photo.style.filter = 'none';
    }
  };

  var selectEffect = function (event) {
    var filterElement = event.currentTarget;
    window.initializeFilters(filterElement, applyFilter);
  };

  var applyFilter = function (newFilter) {
    var currentValue = parseInt(inputEffectSaturation.value, 10);
    checkFilter(currentValue);
    photo.classList.remove('effect-' + activedEffect);
    photo.classList.add('effect-' + newFilter);
    activedEffect = newFilter;
    if (newFilter === 'none') {
      uploadEffectLevel.style.display = 'none';
    } else {
      uploadEffectLevel.style.display = 'block';
    }
  };

  var returnInitialFormState = function () {
    setImageScale(window.constants.SCALE_START_VALUE);
    hashtagsInput.value = '';
    hashtagsInput.style.borderColor = 'initial';
    descriptionInput.value = '';
    clearEffects();
  };

  var getHashtags = function () {
    var inputValue = hashtagsInput.value.toLowerCase();
    inputValue = inputValue ? inputValue.split(/\s+/) : [];
    return inputValue.filter(function (value) {
      return value !== '';
    });
  };

  var controlHashtagsValidity = function () {
    var hashtags = getHashtags();

    var hasOverRangeHashtagLength = hashtags.some(function (hashTag) {
      return hashTag.length > 20 || hashTag.length < 2;
    });

    var uncorrectTag = hashtags.some(function (hashTag) {
      return hashTag[0] !== '#' || hashTag.indexOf('#') !== hashTag.lastIndexOf('#');
    });

    var hasRepeatHashtags = hashtags.some(function (hashTag) {
      return hashtags.indexOf(hashTag) !== hashtags.lastIndexOf(hashTag);
    });

    if (hashtags.length > 5 || hasOverRangeHashtagLength || uncorrectTag || hasRepeatHashtags) {
      hashtagsInput.setCustomValidity('Поле заполненно некорректно');
      hashtagsInput.style.borderColor = 'red';
    } else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.borderColor = 'initial';
    }
  };

  var checkFilter = function (newPercent) {
    for (var n = 0; n < effectSwitches.length; n++) {
      if (effectSwitches[n].checked) {
        var filter = effectSwitches[n].value;
        var filterValue;

        switch (filter) {
          case 'none':
            filterValue = 'none';
            break;
          case 'chrome':
            filterValue = 'grayscale(' + String(parseFloat(newPercent / 100).toFixed(2)) + ')';
            break;
          case 'sepia':
            filterValue = 'sepia(' + String(parseFloat(newPercent / 100).toFixed(2)) + ')';
            break;
          case 'marvin':
            filterValue = 'invert(' + String(newPercent) + '%)';
            break;
          case 'phobos':
            filterValue = 'blur(' + String(Math.round((newPercent * 3) / 100)) + 'px)';
            break;
          case 'heat':
            filterValue = 'brightness(' + String(parseFloat((newPercent * 3) / 100).toFixed(1)) + ')';
            break;
        }
        photo.style.filter = filterValue;
      }
    }
  };

  var uploadChangeHandler = function () {
    uploadOverlay.classList.remove('hidden');
    uploadEffectLevel.style.display = 'none';
    addUploadCloseHandlers();
  };

  var clickUploadCloseBtnHandler = function (event) {
    event.preventDefault();
    returnInitialFormState();
    uploadOverlay.classList.add('hidden');
    removeUploadCloseHandlers();
  };

  var pressUploadCloseBtnHandler = function (event) {
    if (event.keyCode === window.constants.ENTER_KEY_CODE) {
      returnInitialFormState();
      uploadOverlay.classList.add('hidden');
      removeUploadCloseHandlers();
    }
  };

  var escUploadBtnHandler = function (event) {
    if (event.keyCode === window.constants.ESC_KEY_CODE) {
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

  var removeUploadCloseHandlers = function () {
    uploadCloseBtn.removeEventListener('click', clickUploadCloseBtnHandler);
    uploadCloseBtn.removeEventListener('keydown', pressUploadCloseBtnHandler);
    document.removeEventListener('keydown', escUploadBtnHandler);
  };

  var addEffectSelectHandlers = function () {
    for (var a = 0; a < effectSwitches.length; a++) {
      effectSwitches[a].addEventListener('change', selectEffect);
    }
  };

  var onSuccessHandler = function () {
    uploadEffectLevel.style.display = 'none';
    hashtagsInput.value = '';
    uploadFormDescription.value = '';
    effectNone.checked = true;
  };

  var onErrorHandler = function (onError) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 50; margin: 0 auto; padding: 20px 0; text-align: center; background-color: yellow; color: #000; position: absolute; left: 0; top: 0; width: 100%; font-size: 30px; font-weight: 700; box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.5);';
    errorBlock.textContent = onError;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  pinEffectSaturation.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX
    };
    var percent = 0;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };


      var currentX = pinEffectSaturation.offsetLeft - shift.x;
      if (currentX >= window.constants.PIN_X_MIN && currentX <= window.constants.PIN_X_MAX) {
        startCoords = {
          x: moveEvt.clientX
        };
        pinEffectSaturation.style.left = currentX + 'px';
        levelEffectBar.style.width = parseInt(pinEffectSaturation.style.left, 10) + 'px';
        percent = Math.round(100 / window.constants.PIN_X_MAX * currentX);
        inputEffectSaturation.value = percent;
        checkFilter(percent);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  uploadImageInput.addEventListener('change', uploadChangeHandler);

  uploadButtonSubmit.addEventListener('click', function () {
    controlHashtagsValidity();
  });

  hashtagsInput.addEventListener('input', function () {
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style.borderColor = 'initial';
  });

  uploadImageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.save(new FormData(uploadImageForm), onSuccessHandler, onErrorHandler);
  });

  window.initilizeScale(uploadImageForm, setImageScale);
  addEffectSelectHandlers();
  setImageScale(window.constants.SCALE_START_VALUE);
})();

