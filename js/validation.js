import {isEscapeKey} from './util.js';
import {sendData} from './api.js';

const HASHTAG_CRITERION = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_DISCRIPTION_COUNT = 140;
const ERROR_HASHTAG_MESSAGE = `- хэш-тег должен начинаться с символа #;
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- хеш-тег не может состоять только из одной решётки;
- максимальная длина одного хэш-тега 20 символов, включая решётку;
- хэш-теги разделяются пробелами;
- один и тот же хэш-тег не может быть использован дважды;
- нельзя указать больше пяти хэш-тегов`;
const ERROR_DISCRIPTION_MESSAGE = 'Длина не должна превышать 140 символов';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const discriptionFieldElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const errorTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const successTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const successMessage = successTemplateElement.cloneNode(true);
const errorMessage = errorTemplateElement.cloneNode(true);

const onErrorKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessage.remove();
  }
  document.removeEventListener('keydown', onErrorKeydown);
};

const onErrorClick = (evt) => {
  if(!evt.target.closest('.error__inner') || evt.target.matches('.error__button')) {
    errorMessage.remove();
  }
  document.removeEventListener('click', onErrorClick);
};

const showErrorMessage = () => {
  document.querySelector('body').append(errorMessage);
  // console.log(document.body.contains(errorMessage));
  document.addEventListener('click', onErrorClick);
  document.addEventListener('keydown', onErrorKeydown);
};

const onSuccessKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    successMessage.remove();
  }
  document.removeEventListener('keydown', onSuccessKeydown);
};

const onSuccessClick = (evt) => {
  if(!evt.target.closest('.success__inner') || evt.target.matches('.success__button')) {
    successMessage.remove();
  }
  document.removeEventListener('click', onSuccessClick);
};

const showSuccessMessage = () => {
  document.querySelector('body').append(successMessage);
  document.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessKeydown);
};

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtags = (value) => {
  const hashtags = value.trim().split(' ');
  const uniqueHashtags = hashtags.filter((hashtag, index) => hashtags.indexOf(hashtag) === index);
  const arr = [];
  hashtags.forEach((hashtag) => {
    arr.push(HASHTAG_CRITERION.test(hashtag));
  });
  return !arr.includes(false) && hashtags.length <= MAX_HASHTAG_COUNT && hashtags.length === uniqueHashtags.length || value === '';
};

pristine.addValidator(hashtagsFieldElement, validateHashtags, ERROR_HASHTAG_MESSAGE);

const validateDiscription = (value) => value.length <= MAX_DISCRIPTION_COUNT;

pristine.addValidator(discriptionFieldElement, validateDiscription, ERROR_DISCRIPTION_MESSAGE);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValide = pristine.validate();
    if(isValide) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(showErrorMessage)
        .finally(unblockSubmitButton);
    }
  });
};

export {onFormSubmit};
