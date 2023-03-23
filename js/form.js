import {isEscapeKey} from './util.js';
import {bodyElement} from './photo-rendering.js';
import {onPreviewCreateEffect} from './effect-slider.js';
import {onPictureDecrement, onPictureIncrement} from './foto-transform.js';
import {onFormSubmit} from './validation.js';

const uploadFieldElement = document.querySelector('.img-upload');
const imageEditBoxElement = uploadFieldElement.querySelector('.img-upload__overlay');
const uploadFileElement = uploadFieldElement.querySelector('#upload-file');
const editBoxCancelElement = uploadFieldElement.querySelector('.img-upload__cancel');
const uploadFormElement = uploadFieldElement.querySelector('.img-upload__form');
const hashtagsFieldElement = uploadFieldElement.querySelector('.text__hashtags');
const discriptionFieldElement = uploadFieldElement.querySelector('.text__description');
const zoomValueElement = uploadFieldElement.querySelector('.scale__control--value');
const imagePreviewElement = uploadFieldElement.querySelector('.img-upload__preview img');
const sliderContainerElement = uploadFieldElement.querySelector('.img-upload__effect-level');
const textAreaElement = uploadFieldElement.querySelector('.img-upload__text');
const effectsListElement = uploadFieldElement.querySelector('.effects__list');
const zoomDownElement = uploadFieldElement.querySelector('.scale__control--smaller');
const zoomUpElement = uploadFieldElement.querySelector('.scale__control--bigger');

const onEditBoxKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    imageEditBoxElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
};

const onTextAreaKeydownLock = () => {
  textAreaElement.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

const onImageEditBoxClose = () => {
  imageEditBoxElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadFileElement.value = '';
  zoomValueElement.value = '';

  document.removeEventListener('keydown', onEditBoxKeydown);
  editBoxCancelElement.removeEventListener('click', onImageEditBoxClose);
  hashtagsFieldElement.removeEventListener('focus', onTextAreaKeydownLock);
  discriptionFieldElement.removeEventListener('focus', onTextAreaKeydownLock);
  effectsListElement.removeEventListener('change', onPreviewCreateEffect);
  zoomDownElement.removeEventListener('click', onPictureDecrement);
  zoomUpElement.removeEventListener('click', onPictureIncrement);
  uploadFormElement.removeEventListener('submit', onFormSubmit);
};

const onImageEditBoxOpen = () => {
  imageEditBoxElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  zoomValueElement.value = '100%';
  sliderContainerElement.style.display = 'none';
  imagePreviewElement.style.filter = 'none';
  imagePreviewElement.style.transform = 'scale(1)';
  imagePreviewElement.dataset.scaleValue = '1';

  document.addEventListener('keydown', onEditBoxKeydown);
  editBoxCancelElement.addEventListener('click', onImageEditBoxClose);
  hashtagsFieldElement.addEventListener('focus', onTextAreaKeydownLock);
  discriptionFieldElement.addEventListener('focus', onTextAreaKeydownLock);
  effectsListElement.addEventListener('change', onPreviewCreateEffect);
  zoomDownElement.addEventListener('click', onPictureDecrement);
  zoomUpElement.addEventListener('click', onPictureIncrement);
  uploadFormElement.addEventListener('submit', onFormSubmit);
};

uploadFileElement.addEventListener('change', () => {
  onImageEditBoxOpen();
});

export {uploadFormElement, hashtagsFieldElement, discriptionFieldElement, zoomValueElement, imagePreviewElement,sliderContainerElement};
