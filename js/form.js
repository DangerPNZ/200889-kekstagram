'use strict';
(function () {
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
  var btnNone = uploadImageForm.querySelector('#upload-effect-none');

  var cleanEffects = function () {
    if (activedEffect) {
      photo.classList.remove(activedEffect);
      btnNone.focus();
    }
  };

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
//
  changeImageScale();
  addEffectSelectHandlers();
  uploadImageForm.addEventListener('submit', controlHashtagsValidity);
})();
