'use strict';

(function () {
  window.initilize = function (element, callback) {
    var btnMinus = element.querySelector('.upload-resize-controls-button-dec');
    var btnPlus = element.querySelector('.upload-resize-controls-button-inc');
    var scaleValueInput = element.querySelector('.upload-resize-controls-value');

    btnMinus.addEventListener('click', function () {
      var currentScaleValue = parseInt(scaleValueInput.value, 10);
      if (currentScaleValue > window.constants.SCALE_MIN_VALUE) {
        scaleValueInput.value = currentScaleValue - window.constants.SCALE_CHANGE_STEP + '%';
        callback(parseInt(scaleValueInput.value, 10));
      }
    });

    btnPlus.addEventListener('click', function () {
      var currentScaleValue = parseInt(scaleValueInput.value, 10);
      if (currentScaleValue < window.constants.SCALE_MAX_VALUE) {
        scaleValueInput.value = currentScaleValue + window.constants.SCALE_CHANGE_STEP + '%';
        callback(parseInt(scaleValueInput.value, 10));
      }
    });
  };
})();
