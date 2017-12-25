'use strict';
(function () {
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadImageInput = uploadImageForm.querySelector('#upload-file');
  var uploadOverlay = uploadImageForm.querySelector('.upload-overlay');
  var uploadCloseBtn = uploadImageForm.querySelector('.upload-form-cancel');
  var effectSwitches = uploadImageForm.querySelectorAll('input[name="effect"]');
  var photo = uploadImageForm.querySelector('.effect-image-preview');
  var hashtagsInput = uploadImageForm.querySelector('.upload-form-hashtags');
  var descriptionInput = uploadImageForm.querySelector('.upload-form-description');
  var activedEffect = null;
  var btnNone = uploadImageForm.querySelector('#upload-effect-none');

  var cleanEffects = function () {
    if (activedEffect) {
      photo.classList.remove(activedEffect);
      btnNone.focus();
    }
  };

  var returnInitialFormState = function () {
    setImageScale(window.constants.SCALE_START_VALUE);
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


  var setImageScale = function (val) {
    photo.style.transform = 'scale(' + (val / 100) + ')';
  };
  setImageScale(window.constants.SCALE_START_VALUE);

  window.initilize(uploadImageForm, setImageScale);

  var applyFilter = function (newFilter) {
    photo.classList.remove('effect-' + activedEffect);
    resetFilterValue();
    photo.classList.add('effect-' + newFilter);
    activedEffect = newFilter;
  };

  var selectEffect = function (event) {
    var filterElement = event.currentTarget;
    window.initializeFilters(filterElement, applyFilter);
  };

  var addEffectSelectHandlers = function () {
    for (var a = 0; a < effectSwitches.length; a++) {
      effectSwitches[a].addEventListener('change', selectEffect);
    }
  };

  var getHashtags = function () {
    return hashtagsInput.value === '' ? [] : hashtagsInput.value.split(/\s+/);
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
  var pinEffectSaturation = uploadImageForm.querySelector('.upload-effect-level-pin');
  var levelEffectBar = uploadImageForm.querySelector('.upload-effect-level-val');
  var inputEffectSaturation = uploadImageForm.querySelector('.upload-effect-level-value');
  var percent = null;

  pinEffectSaturation.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX
    };
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
  var resetFilterValue = function () {
    inputEffectSaturation.value = 0;
    levelEffectBar.style.width = 0;
    pinEffectSaturation.style.left = 0;
    photo.style.filter = 'none';
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
  var onSuccessFunc = function () {
    uploadImageForm.send();
    returnInitialFormState();
  };

  var onSuccesError = function (onError) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 50; margin: 0 auto; padding: 20px 0; text-align: center; background-color: yellow; color: #000; position: absolute; left: 0; top: 0; width: 100%; font-size: 30px; font-weight: 700; box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.5);';
    errorBlock.textContent = onError;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };
  uploadImageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addEffectSelectHandlers();
    window.backend.save(new FormData(uploadImageForm), onSuccessFunc, onSuccesError);
  });
  window.initilize(uploadImageForm, setImageScale);
  addEffectSelectHandlers();
  uploadImageForm.addEventListener('submit', controlHashtagsValidity);
})();

