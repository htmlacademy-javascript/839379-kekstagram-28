import {getRandomNumber} from './util.js';

const MAX_THUMBNAILS_COUNT = 10;
const MIN_THUMBNAILS_COUNT = 0;
const filterElement = document.querySelector('.img-filters');
const filterFormElement = filterElement.querySelector('.img-filters__form');
const buttonsElement = filterFormElement.querySelectorAll('.img-filters__button');
const filterDefaultElement = filterElement.querySelector('#filter-default');
const filterRandomElement = filterElement.querySelector('#filter-random');
const filterDiscussedElement = filterElement.querySelector('#filter-discussed');
const ACTIVE_BUTTON = 'img-filters__button--active';
const ACTIVE_FILTER = 'img-filters--inactive';

const setButtonStyle = (evt) => {
  buttonsElement.forEach((element) => {
    element.classList.remove(ACTIVE_BUTTON);
  });
  evt.target.classList.add(ACTIVE_BUTTON);
};

const comparePhotos = (PhotoOne, PhotoTwo) => {
  const rankOne = PhotoOne.comments.length;
  const rankTwo = PhotoTwo.comments.length;

  return rankTwo - rankOne;
};

const sortThumbnails = (photoObjects, cb) => {
  filterFormElement.addEventListener('click', (evt) => {
    switch (evt.target) {
      case filterDefaultElement: {
        const defaultPhotos = photoObjects.slice();
        cb(defaultPhotos);
      }
        break;
      case filterRandomElement: {
        const randomPhotos = photoObjects.slice().sort(() => getRandomNumber()).slice(MIN_THUMBNAILS_COUNT, MAX_THUMBNAILS_COUNT);
        cb(randomPhotos);
      }
        break;
      case filterDiscussedElement: {
        const discussedPhotos = photoObjects.slice().sort(comparePhotos);
        cb(discussedPhotos);
      }
        break;
    }
    setButtonStyle(evt);
  });
};

const filterBoxOpen = () => {
  filterElement.classList.remove(ACTIVE_FILTER);
};

export {filterBoxOpen, sortThumbnails};
