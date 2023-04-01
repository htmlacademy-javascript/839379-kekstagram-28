import {isEscapeKey} from './util.js';
// import {picturesElement} from './thumbnail-rendering.js';

const COMMENTS_BLOCK_SIZE = 5;
const MIN_COMMENTS_COUNT = 0;
const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentsBoxElement = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsBoxElement.querySelector('.social__comment');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
let commentsCopy = [];
let firstComment = 0;
let lastComment = 0;

commentsCountElement.innerHTML = '';

const loadComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const visualComments = commentsCopy.slice(firstComment, lastComment);
  visualComments.forEach((comment) => {
    const socialCommentCopy = commentElement.cloneNode(true);
    socialCommentCopy.querySelector('.social__picture').src = comment.avatar;
    socialCommentCopy.querySelector('.social__picture').alt = comment.name;
    socialCommentCopy.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(socialCommentCopy);
  });
  commentsBoxElement.append(commentsFragment);
  const commentsElement = commentsBoxElement.querySelectorAll('.social__comment');
  commentsCountElement.textContent = `${commentsElement.length} из ${commentsCopy.length} комментариев`;
  firstComment += COMMENTS_BLOCK_SIZE;
  lastComment += COMMENTS_BLOCK_SIZE;
  if(commentsElement.length === commentsCopy.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

function onBigPictureKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    commentsBoxElement.innerHTML = '';
    document.removeEventListener('keydown', onBigPictureKeydown);
    pictureCancelElement.removeEventListener('click', onBigPictureClose);
    commentsLoaderElement.removeEventListener('click', loadComments);
  }
}

function onBigPictureClose () {
  bigPictureElement.classList.add('hidden');
  commentsBoxElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureKeydown);
  pictureCancelElement.removeEventListener('click', onBigPictureClose);
  commentsLoaderElement.removeEventListener('click', loadComments);
}

const onBibPictureOpen = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
  pictureCancelElement.addEventListener('click', onBigPictureClose);
};

const renderBigPhoto = (evt, photoObjects) => {
  commentsBoxElement.innerHTML = '';
  // console.log(photoObjects);
  const currentThumbnail = evt.target.closest('.picture');
  const thumbnailPointer = currentThumbnail.dataset.thumbnailId;
  const currentPhotoObject = photoObjects.find((photo) => photo.id === +thumbnailPointer);
  const {url, description, likes, comments} = currentPhotoObject;
  likesCountElement.textContent = likes;
  bigPictureImgElement.src = url;
  socialCaptionElement.textContent = description;
  commentsCopy = comments;
  firstComment = MIN_COMMENTS_COUNT;
  lastComment = commentsCopy.length <= COMMENTS_BLOCK_SIZE ? commentsCopy.length : COMMENTS_BLOCK_SIZE;
  loadComments();
  commentsLoaderElement.addEventListener('click', loadComments);
};


export {renderBigPhoto, onBibPictureOpen, bodyElement};
