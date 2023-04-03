import {isEscapeKey} from './util.js';
import {bodyElement} from './photo-rendering.js';
import {onPreviewCreateEffect} from './effect-slider.js';
import {onPictureDecrement, onPictureIncrement} from './foto-transform.js';

const EXTENSIONS = ['jpg', 'jpeg', 'png'];
const START_VALUE = '100%';
const START_WRAP = 'none';
const START_SCALE = 'scale(1)';
const START_SCALE_DATA = '1';

const uploadFieldElement = document.querySelector('.img-upload');
const imageEditBoxElement = uploadFieldElement.querySelector('.img-upload__overlay');
const uploadFileElement = uploadFieldElement.querySelector('#upload-file');
const editBoxCancelElement = uploadFieldElement.querySelector('.img-upload__cancel');
const hashtagsFieldElement = uploadFieldElement.querySelector('.text__hashtags');
const discriptionFieldElement = uploadFieldElement.querySelector('.text__description');
const zoomValueElement = uploadFieldElement.querySelector('.scale__control--value');
const imagePreviewElement = uploadFieldElement.querySelector('.img-upload__preview img');
const sliderContainerElement = uploadFieldElement.querySelector('.img-upload__effect-level');
const effectsListElement = uploadFieldElement.querySelector('.effects__list');
const effectsPrewiewElement = effectsListElement.querySelectorAll('.effects__preview');
const zoomDownElement = uploadFieldElement.querySelector('.scale__control--smaller');
const zoomUpElement = uploadFieldElement.querySelector('.scale__control--bigger');
const defaultEffectElement = uploadFieldElement.querySelector('#effect-none');
const uploadFormElement = document.querySelector('.img-upload__form');

const onTextKeydownLock = (evt) => {
  evt.stopPropagation();
};

function onEditBoxKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onEditBoxClose();
  }
}

function onEditBoxClose () {
  imageEditBoxElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadFormElement.reset();
  window.removeEventListener('keydown', onEditBoxKeydown);
  editBoxCancelElement.removeEventListener('click', onEditBoxClose);
  hashtagsFieldElement.removeEventListener('keydown', onTextKeydownLock);
  discriptionFieldElement.removeEventListener('keydown', onTextKeydownLock);
  effectsListElement.removeEventListener('change', onPreviewCreateEffect);
  zoomDownElement.removeEventListener('click', onPictureDecrement);
  zoomUpElement.removeEventListener('click', onPictureIncrement);
}

const onEditBoxOpen = () => {
  imageEditBoxElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  zoomValueElement.value = START_VALUE;
  sliderContainerElement.style.display = START_WRAP;
  imagePreviewElement.style.filter = START_WRAP;
  imagePreviewElement.style.transform = START_SCALE;
  imagePreviewElement.dataset.scaleValue = START_SCALE_DATA;
  defaultEffectElement.checked = true;
  window.addEventListener('keydown', onEditBoxKeydown);
  editBoxCancelElement.addEventListener('click', onEditBoxClose);
  hashtagsFieldElement.addEventListener('keydown', onTextKeydownLock);
  discriptionFieldElement.addEventListener('keydown', onTextKeydownLock);
  effectsListElement.addEventListener('change', onPreviewCreateEffect);
  zoomDownElement.addEventListener('click', onPictureDecrement);
  zoomUpElement.addEventListener('click', onPictureIncrement);
};

uploadFileElement.addEventListener('change', () => {
  onEditBoxOpen();
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const isMatches = EXTENSIONS.some((it) => fileName.endsWith(it));
  if(isMatches) {
    imagePreviewElement.src = URL.createObjectURL(file);
    effectsPrewiewElement.forEach((preview) => {
      preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});

export {
  hashtagsFieldElement, discriptionFieldElement, zoomValueElement,
  imagePreviewElement,sliderContainerElement, onEditBoxClose,
  uploadFormElement,
};
