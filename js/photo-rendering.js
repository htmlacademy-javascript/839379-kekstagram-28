import {isEscapeKey} from './util.js';
import {picturesElement} from './thumbnail-rendering.js';

const COMMENTS_BLOCK_SIZE = 5;
const MIN_COMMENTS_COUNT = 0;
const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsBoxElement = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsBoxElement.querySelector('.social__comment');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');

let newComments = [];
let firstComment = 0;
let lastComment = 0;

commentsCountElement.innerHTML = '';

const onCommentsLoad = () => {
  const commentsFragment = document.createDocumentFragment();
  const visualComments = newComments.slice(firstComment, lastComment);
  visualComments.forEach((comment) => {
    const commentCopy = commentElement.cloneNode(true);
    commentCopy.querySelector('.social__picture').src = comment.avatar;
    commentCopy.querySelector('.social__picture').alt = comment.name;
    commentCopy.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(commentCopy);
  });
  commentsBoxElement.append(commentsFragment);
  const commentsElement = commentsBoxElement.querySelectorAll('.social__comment');
  commentsCountElement.textContent = `${commentsElement.length} из ${newComments.length} комментариев`;
  firstComment += COMMENTS_BLOCK_SIZE;
  lastComment += COMMENTS_BLOCK_SIZE;
  if(commentsElement.length === newComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

function onBigPictureKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

function onBigPictureClose () {
  commentsBoxElement.innerHTML = '';
  bigPictureElement.classList.add('hidden');
  commentsLoaderElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureKeydown);
  pictureCancelElement.removeEventListener('click', onBigPictureClose);
  commentsLoaderElement.removeEventListener('click', onCommentsLoad);
}

const onBibPictureOpen = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
  pictureCancelElement.addEventListener('click', onBigPictureClose);
};

const renderPhotoCard = (photoObjects) => {
  const onBigPhotoRender = (evt) => {
    commentsBoxElement.innerHTML = '';
    const currentThumbnail = evt.target.closest('.picture');
    const thumbnailPointer = currentThumbnail.dataset.thumbnailId;
    const currentPhotoObject = photoObjects.find((photo) => photo.id === +thumbnailPointer);
    const {url, description, likes, comments} = currentPhotoObject;
    likesCountElement.textContent = likes;
    bigPictureImgElement.src = url;
    captionElement.textContent = description;
    newComments = [...comments];
    firstComment = MIN_COMMENTS_COUNT;
    lastComment = newComments.length <= COMMENTS_BLOCK_SIZE ? newComments.length : COMMENTS_BLOCK_SIZE;
    onCommentsLoad();
    commentsLoaderElement.addEventListener('click', onCommentsLoad);
  };

  picturesElement.addEventListener('click', (evt) => {
    if(evt.target.closest('.picture')) {
      evt.preventDefault();
      onBibPictureOpen();
      onBigPhotoRender(evt);
    }
  });
};

export {renderPhotoCard, bodyElement};
