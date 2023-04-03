import {getRandomNumber} from './util.js';

const MAX_THUMBNAILS_COUNT = 10;
const MIN_THUMBNAILS_COUNT = 0;
const FILTER_BUTTON_ACTIVE = 'img-filters__button--active';
const FILTER_INACTIVE = 'img-filters--inactive';
const filterElement = document.querySelector('.img-filters');
const buttonsElement = filterElement.querySelectorAll('.img-filters__button');

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let miniatures = [];

let currentFilter = Filters.DEFAULT;

const setButtonStyle = (evt) => {
  buttonsElement.forEach((element) => {
    element.classList.remove(FILTER_BUTTON_ACTIVE);
  });
  evt.target.classList.add(FILTER_BUTTON_ACTIVE);
};

const comparePhotos = (PhotoOne, PhotoTwo) => {
  const rankOne = PhotoOne.comments.length;
  const rankTwo = PhotoTwo.comments.length;

  return rankTwo - rankOne;
};

const sortThumbnails = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return [...miniatures].sort(() => getRandomNumber()).slice(MIN_THUMBNAILS_COUNT, MAX_THUMBNAILS_COUNT);
    case Filters.DISCUSSED:
      return [...miniatures].sort(comparePhotos);
    default:
      return [...miniatures];
  }
};

const onFilterClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    if(!evt.target.matches('.img-filters__button')) {
      return;
    }

    if(evt.target === currentFilter) {
      return;
    }

    setButtonStyle(evt);
    currentFilter = evt.target.id;
    cb(sortThumbnails());
  });
};

const filterThumbnails = (photos, cb) => {
  filterElement.classList.remove(FILTER_INACTIVE);
  miniatures = [...photos];
  onFilterClick(cb);
};

export {filterThumbnails, sortThumbnails};
