import {getRandomInteger, getRandomArrayElement, createUniqueInteger} from './util.js';

const DESCRIPTIONS = [
  'Моё лучшее фото месяца!',
  'Посмотрите! Как вам?',
  'Больше лайков!!!',
  'Внимание! Новое фото!',
  'Прекрасно провожу время =)',
  'В отпуске', 'Мой mood на сегодня',
];

const NAMES = [
  'Артем',
  'Илья',
  'Мария',
  'Кирилл',
  'Ольга',
  'Юлия',
  'Константин',
  'Виктория',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_OBJECTS_QUANTITY = 25;
const MIN_LIKES_QUANTITY = 15;
const MAX_LIKES_QUANTITY = 200;
const MIN_NUMBER = 1;
const MAX_NUMBER = 25;
const MAX_COMENT_ID_NUMBER = 100;
const MAX_AVATAR_QUANTITY = 6;
const MAX_MESSAGE_QUANTITY = 2;
const MAX_COMMENT_QUANTITY = 20;

const getPhotoId = createUniqueInteger(MIN_NUMBER, MAX_NUMBER);
const getUrlPhoto = createUniqueInteger(MIN_NUMBER, MAX_NUMBER);
const getCommentId = createUniqueInteger(MIN_NUMBER, MAX_COMENT_ID_NUMBER);

const createMessage = () => ((Array.from({length:getRandomInteger(MIN_NUMBER, MAX_MESSAGE_QUANTITY)}, () => getRandomArrayElement(MESSAGES))).join(' '));

const createComment = () => ({
  commentId: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_NUMBER, MAX_AVATAR_QUANTITY)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoObject = () =>
  ({
    photoId: getPhotoId(),
    url: `photos/${getUrlPhoto()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY),
    comments: Array.from({length:getRandomInteger(MIN_NUMBER, MAX_COMMENT_QUANTITY)}, createComment),
  });

const createPhotoObjects = () => Array.from({length:PHOTO_OBJECTS_QUANTITY}, createPhotoObject);

export {createPhotoObjects};
