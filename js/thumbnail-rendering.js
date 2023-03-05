import {createPhotoObjectsArray} from './data.js';

const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');
// console.log(pictureTemplate)
const picturesElement = document.querySelector('.pictures');
// console.log(pictures)
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
