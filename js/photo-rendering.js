import {isEscapeKey} from './util.js';
import {picturesElement} from './thumbnail-rendering.js';


const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsElement.querySelector('.social__comment');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');

commentsCountElement.innerHTML = '';

const renderBigPhoto = (photoObjects) => {
  const onBigPictureKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      bigPictureElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      socialCommentsElement.innerHTML = '';
    }
  };

  const onBigPictureClose = () => {
    bigPictureElement.classList.add('hidden');
    socialCommentsElement.innerHTML = '';
    commentsLoaderElement.classList.remove('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureKeydown);
    pictureCancelElement.removeEventListener('click', onBigPictureClose);
  };

  const onBibPictureOpen = () => {
    bigPictureElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureKeydown);
    pictureCancelElement.addEventListener('click', onBigPictureClose);
  };
  const onBigPictureRender = (evt) => {
    const currentThumbnail = evt.target.closest('.picture');
    const thumbnailPointer = currentThumbnail.dataset.thumbnailId;
    const currentPhotoObject = photoObjects.find((photo) => photo.id === +thumbnailPointer);
    const {url, description, likes, comments} = currentPhotoObject;
    likesCountElement.textContent = likes;
    bigPictureImgElement.src = url;
    socialCaptionElement.textContent = description;
    const loadComments = (function() {
      const commentsFragment = document.createDocumentFragment();
      const COMMENT_BLOCK_SIZE = 5;
      let firstComment = 0;
      let lastComment = comments.length <= COMMENT_BLOCK_SIZE ? comments.length : COMMENT_BLOCK_SIZE;
      return function() {
        const visualComments = comments.slice(firstComment, lastComment);
        visualComments.forEach((comment) => {
          const socialCommentCopy = socialCommentElement.cloneNode(true);
          socialCommentCopy.querySelector('.social__picture').src = comment.avatar;
          socialCommentCopy.querySelector('.social__picture').alt = comment.name;
          socialCommentCopy.querySelector('.social__text').textContent = comment.message;
          commentsFragment.append(socialCommentCopy);
        });
        socialCommentsElement.append(commentsFragment);
        commentsCountElement.textContent = `${socialCommentsElement.children.length} из ${comments.length} комментариев`;
        if(socialCommentsElement.children.length === comments.length) {
          commentsLoaderElement.classList.add('hidden');
        }
        firstComment += COMMENT_BLOCK_SIZE;
        lastComment += COMMENT_BLOCK_SIZE;
      };
    })();
    socialCommentsElement.innerHTML = '';
    loadComments();
    commentsLoaderElement.addEventListener('click', loadComments);
  };

  picturesElement.addEventListener('click', (evt) => {
    if(evt.target.closest('.picture')) {
      evt.preventDefault();
      onBibPictureOpen();
      onBigPictureRender(evt);
    }
  });
};

export {renderBigPhoto, bodyElement};
