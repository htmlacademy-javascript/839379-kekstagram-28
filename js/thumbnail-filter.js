import {getRandomNumber} from './util.js';
import {renderThumbnails} from './thumbnail-rendering.js';

const MAX_THUMBNAILS_COUNT = 10;
const MIN_THUMBNAILS_COUNT = 0;
const filterElement = document.querySelector('.img-filters');
const filterFormElement = filterElement.querySelector('.img-filters__form');
const buttonsElement = filterFormElement.querySelectorAll('.img-filters__button');
const filterDefaultElement = filterElement.querySelector('#filter-default');
const filterRandomElement = filterElement.querySelector('#filter-random');
const filterDiscussedElement = filterElement.querySelector('#filter-discussed');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const ACTIVE_FILTER_CLASS = 'img-filters--inactive';

const setButtonStyle = (evt) => {
  buttonsElement.forEach((element) => {
    element.classList.remove(ACTIVE_BUTTON_CLASS);
  });
  evt.target.classList.add(ACTIVE_BUTTON_CLASS);
};

const comparePhotos = (PhotoOne, PhotoTwo) => {
  const rankOne = PhotoOne.comments.length;
  const rankTwo = PhotoTwo.comments.length;

  return rankTwo - rankOne;
};

const sortThumbnails = (photoObjects) => {
  filterFormElement.addEventListener('click', (evt) => {
    switch (evt.target) {
      case filterDiscussedElement: {
        const discussedPhotos = photoObjects.slice().sort(comparePhotos);
        renderThumbnails(discussedPhotos);
        setButtonStyle(evt);
      }
        break;
      case filterDefaultElement: {
        const defaultPhotos = photoObjects.slice();
        renderThumbnails(defaultPhotos);
        setButtonStyle(evt);
      }
        break;
      case filterRandomElement: {
        const randomPhotos = photoObjects.slice().sort(() => getRandomNumber()).slice(MIN_THUMBNAILS_COUNT, MAX_THUMBNAILS_COUNT);
        renderThumbnails(randomPhotos);
        setButtonStyle(evt);
      }
        break;
    }
  });
};


const filterBoxOpen = () => {
  filterElement.classList.remove(ACTIVE_FILTER_CLASS);
};

export {filterBoxOpen, sortThumbnails};
