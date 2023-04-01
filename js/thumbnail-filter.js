import {getRandomNumber} from './util.js';

const MAX_THUMBNAILS_COUNT = 10;
const MIN_THUMBNAILS_COUNT = 0;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const ACTIVE_FILTER_CLASS = 'img-filters--inactive';
const filterElement = document.querySelector('.img-filters');
const filterFormElement = filterElement.querySelector('.img-filters__form');
const buttonsElement = filterFormElement.querySelectorAll('.img-filters__button');
const filterDefaultElement = filterElement.querySelector('#filter-default');
const filterRandomElement = filterElement.querySelector('#filter-random');
const filterDiscussedElement = filterElement.querySelector('#filter-discussed');

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let thumbnails = [];

let currentFilter = Filters.DEFAULT;

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

const sortThumbnails = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return thumbnails.slice().sort(() => getRandomNumber()).slice(MIN_THUMBNAILS_COUNT, MAX_THUMBNAILS_COUNT);
    case Filters.DISCUSSED:
      return thumbnails.slice().sort(comparePhotos);
    default:
      return thumbnails;
  }
};

const onFilterClick = (cb) => {
  filterFormElement.addEventListener('click', (evt) => {
    if(evt.target === filterDefaultElement) {
      currentFilter = Filters.DEFAULT;
    }
    if(evt.target === filterRandomElement) {
      currentFilter = Filters.RANDOM;
    }
    if(evt.target === filterDiscussedElement) {
      currentFilter = Filters.DISCUSSED;
    }
    setButtonStyle(evt);
    cb(sortThumbnails());
  });
};

const filterThumbnails = (photos, cb) => {
  filterElement.classList.remove(ACTIVE_FILTER_CLASS);
  thumbnails = photos.slice();
  onFilterClick(cb);
};

export {filterThumbnails, sortThumbnails};
