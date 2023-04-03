import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {uploadFormElement} from './photo-modal.js';
import {pristine} from './validation.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const errorTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const successTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success');


const successMessage = successTemplateElement.cloneNode(true);
const errorMessage = errorTemplateElement.cloneNode(true);

const errorRemoveHendler = () => {
  errorMessage.remove();
  document.removeEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onErrorKeydown);
};

function onErrorKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    errorRemoveHendler();
  }
}

function onErrorClick (evt) {
  if(!evt.target.closest('.error__inner') || evt.target.matches('.error__button')) {
    errorRemoveHendler();
  }
}

const showErrorMessage = () => {
  document.querySelector('body').append(errorMessage);
  document.addEventListener('click', onErrorClick);
  document.addEventListener('keydown', onErrorKeydown);
};

const successRemoveHandler = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onSuccessClick);
};

function onSuccessKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    successRemoveHandler();
  }
}

function onSuccessClick (evt) {
  if(!evt.target.closest('.success__inner') || evt.target.matches('.success__button')) {
    successRemoveHandler();
  }
}

const showSuccessMessage = () => {
  document.querySelector('body').append(successMessage);
  document.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessKeydown);
};

const lockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValide = pristine.validate();
    if(isValide) {
      lockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(showErrorMessage)
        .finally(unlockSubmitButton);
    }
  });
};

export {setFormSubmit};
