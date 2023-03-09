import {isEscapeKey} from './util.js';
import {picturesElement, photoObjects} from './thumbnail-rendering.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsElement.querySelector('.social__comment');

const renderBigPhoto = () => {
  const onBigPictureKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      bigPictureElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      socialCommentsElement.innerHTML = '';
    }
  };

  const onBibPictureOpen = () => {
    bigPictureElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureKeydown);
  };

  const onBibPictureClose = () => {
    bigPictureElement.classList.add('hidden');
    socialCommentsElement.innerHTML = '';
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureKeydown);
  };

  const onBigPictureRender = (evt) => {
    const currentThumbnail = evt.target.closest('.picture');
    const thumbnailPointer = currentThumbnail.id;
    const {url, description, likes, comments} = photoObjects[thumbnailPointer];
    likesCountElement.textContent = likes;
    commentsCountElement.textContent = comments.length;
    bigPictureImgElement.src = url;
    socialCaptionElement.textContent = description;
    const commentsFragment = document.createDocumentFragment();
    comments.forEach((comment) => {
      const socialCommentCopy = socialCommentElement.cloneNode(true);
      socialCommentsElement.innerHTML = '';
      socialCommentCopy.querySelector('.social__picture').src = comment.avatar;
      socialCommentCopy.querySelector('.social__picture').alt = comment.name;
      socialCommentCopy.querySelector('.social__text').textContent = comment.message;
      commentsFragment.append(socialCommentCopy);
    });
    socialCommentsElement.append(commentsFragment);
  };

  picturesElement.addEventListener('click', (evt) => {
    if(evt.target.matches('.picture__img')) {
      evt.preventDefault();
      onBibPictureOpen();
      onBigPictureRender(evt);
    }
  });

  pictureCancelElement.addEventListener('click', () => {
    onBibPictureClose();
  });
};

export {renderBigPhoto};
