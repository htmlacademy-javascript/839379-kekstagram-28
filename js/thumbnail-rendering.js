import {createPhotoObjects} from './data.js';

const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesElement = document.querySelector('.pictures');

const photoObjects = createPhotoObjects();

const renderThumbnails = () => {
  const photoObjectsFragment = document.createDocumentFragment();

  photoObjects.forEach(({url, likes, comments}, index)=> {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.id = index;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    photoObjectsFragment.append(pictureElement);
  });

  picturesElement.append(photoObjectsFragment);
};

export {picturesElement, photoObjects, renderThumbnails};
