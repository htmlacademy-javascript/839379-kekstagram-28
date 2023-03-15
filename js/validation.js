import {uploadFormElement, hashtagsFieldElement, discriptionFieldElement} from './form.js';

const HASHTAG_CRITERION = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

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

pristine.addValidator(hashtagsFieldElement, validateHashtags,'неверный формат ввода');

const validateDiscription = (value) => value.length <= 140;

pristine.addValidator(discriptionFieldElement, validateDiscription,'Длина не должна превышать 140 символов');


uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

