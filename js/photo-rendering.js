import {isEscapeKey} from './util.js';
import './thumbnail-rendering.js';
import {picturesElement, photoObjectsArray} from './thumbnail-rendering.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
// const picturesElement = document.querySelector('.pictures');
const thumbnailElements = document.querySelectorAll('.picture');
const pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsElement.querySelector('.social__comment');

const onBigPictureKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    socialCommentsElement.innerHTML = '';
  }
};

const openBibPicture = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
};

const closeBibPicture = () => {
  bigPictureElement.classList.add('hidden');
  socialCommentsElement.innerHTML = '';
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureKeydown);
};

picturesElement.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');
  const pictureLikesElement = currentThumbnail.querySelector('.picture__likes');
  const pictureCommentsElement = currentThumbnail.querySelector('.picture__comments');

  if(evt.target.matches('.picture__img')) {
    evt.preventDefault();
    openBibPicture();
    bigPictureImgElement.src = evt.target.src;
    likesCountElement.textContent = pictureLikesElement.textContent;
    commentsCountElement.textContent = pictureCommentsElement.textContent;
    thumbnailElements.forEach((thumbnail, thumbnailIndex) => {
      if(thumbnail === currentThumbnail) {
        socialCaptionElement.textContent = photoObjectsArray[thumbnailIndex].description;
        const commentsFragment = document.createDocumentFragment();
        photoObjectsArray[thumbnailIndex].comments.forEach((comment, commentIndex) => {
          const socialCommentCopy = socialCommentElement.cloneNode(true);
          socialCommentCopy.querySelector('.social__picture').src = photoObjectsArray[thumbnailIndex].comments[commentIndex].avatar;
          socialCommentCopy.querySelector('.social__picture').alt = photoObjectsArray[thumbnailIndex].comments[commentIndex].name;
          socialCommentCopy.querySelector('.social__text').textContent = photoObjectsArray[thumbnailIndex].comments[commentIndex].message;
          commentsFragment.append(socialCommentCopy);
        });
        socialCommentsElement.append(commentsFragment);
      }
    });
  }
});

pictureCancelElement.addEventListener('click', () => {
  closeBibPicture();
});


