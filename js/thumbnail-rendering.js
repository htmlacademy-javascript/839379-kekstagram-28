import {createPhotoObjectsArray} from './data.js';

const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesElement = document.querySelector('.pictures');

const photoObjectsArray = createPhotoObjectsArray();

const PhotoObjectsFragment = document.createDocumentFragment();

photoObjectsArray.forEach(({url, likes, comments})=> {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  PhotoObjectsFragment.append(pictureElement);
});

picturesElement.append(PhotoObjectsFragment);

export {picturesElement, photoObjectsArray};
