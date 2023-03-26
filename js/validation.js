import {uploadFormElement, hashtagsFieldElement, discriptionFieldElement} from './photo-modal.js';

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

export {pristine};
