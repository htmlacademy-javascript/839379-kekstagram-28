const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ERROR_TEXT = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const loadData = (route, errorText = ERROR_TEXT, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loadData(Route.GET_DATA);

const sendData = (body) => loadData(Route.SEND_DATA, undefined, Method.POST, body);


export {getData, sendData};
