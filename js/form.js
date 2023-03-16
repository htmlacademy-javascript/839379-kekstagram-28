import {isEscapeKey} from './util.js';
import {bodyElement} from './photo-rendering.js';

const uploadFieldElement = document.querySelector('.img-upload');
const imageEditBoxElement = uploadFieldElement.querySelector('.img-upload__overlay');
const uploadFileElement = uploadFieldElement.querySelector('#upload-file');
const editBoxCancelElement = uploadFieldElement.querySelector('.img-upload__cancel');
const uploadFormElement = uploadFieldElement.querySelector('.img-upload__form');
const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const discriptionFieldElement = uploadFormElement.querySelector('.text__description');

const onEditBoxKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    imageEditBoxElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
};

const onImageEditBoxClose = () => {
  imageEditBoxElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadFileElement.value = '';
  editBoxCancelElement.removeEventListener('click', () => {
    onImageEditBoxClose();
    document.removeEventListener('keydown', onEditBoxKeydown);
  });
};

const onImageEditBoxOpen = () => {
  imageEditBoxElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEditBoxKeydown);
  editBoxCancelElement.addEventListener('click', () => {
    onImageEditBoxClose();
  });
};

uploadFileElement.addEventListener('change', () => {
  onImageEditBoxOpen();
});

hashtagsFieldElement.addEventListener('focus', () => {
  hashtagsFieldElement.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
});

discriptionFieldElement.addEventListener('focus', () => {
  discriptionFieldElement.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
});


export {uploadFormElement, hashtagsFieldElement, discriptionFieldElement};
