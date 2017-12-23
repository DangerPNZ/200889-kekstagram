'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(JSON.parse(xhr.responseText));
            break;
          case 301:
            onError('Страница перемещена на другой адрес');
            break;
          case 302:
            onError('Страница временно перемещена на другой адрес');
            break;
          case 401:
            onError('Ошибка запроса');
            break;
          case 403:
            onError('Доступ запрещен');
            break;
          case 404:
            onError('Ничего не найдено');
            break;
          case 500:
            onError('Ошибка сервера');
            break;
          default:
            onError(xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 5000;
      xhr.open('GET', window.constants.DOWNLOAD_URL);
      xhr.send();
    }
  };
})();
