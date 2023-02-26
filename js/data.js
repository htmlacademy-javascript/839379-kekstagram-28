import {getRandomInteger, getRandomArrayElement, createUniqueInteger} from './util.js';

const DESCRIPTIONS = ['Моё лучшее фото месяца!', 'Посмотрите! Как вам?', 'Больше лайков!!!', 'Внимание! Новое фото!', 'Прекрасно провожу время =)', 'В отпуске', 'Мой mood на сегодня',];

const NAMES = ['Артем','Илья', 'Мария', 'Кирилл', 'Ольга', 'Юлия', 'Константин', 'Виктория',];

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо.Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. ', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',];

const PHOTO_OBJECTS_QUANTITY = 25;

const getPhotoId = createUniqueInteger(1, 25);
const getUrlPhoto = createUniqueInteger(1, 25);
const getCommentId = createUniqueInteger(1, 100);

const getPhotoObject = () =>
  ({
    photoId: getPhotoId(),
    url: `photos/${getUrlPhoto()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: {
      commentId: getCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    }
  });

const getArrayPhotoObjects = () => Array.from({length:PHOTO_OBJECTS_QUANTITY}, getPhotoObject);

export {getArrayPhotoObjects};
