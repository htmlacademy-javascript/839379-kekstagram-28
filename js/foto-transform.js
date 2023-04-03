import {zoomValueElement, imagePreviewElement} from './photo-modal.js';

const MIN_ZOOM = 25;
const MAX_ZOOM = 100;
const ZOOM_STEP = 25;
const SCALE_STEP = 0.25;

const onPictureDecrement = () => {
  let zoomValue = parseInt(zoomValueElement.value, 10);
  let scaleValue = +imagePreviewElement.dataset.scaleValue;
  if(zoomValue > MIN_ZOOM) {
    zoomValue -= ZOOM_STEP;
    scaleValue -= SCALE_STEP;
    zoomValueElement.value = `${zoomValue}%`;
    imagePreviewElement.dataset.scaleValue = `${scaleValue}`;
    imagePreviewElement.style.transform = `scale(${scaleValue})`;
  }
};

const onPictureIncrement = () => {
  let zoomValue = parseInt(zoomValueElement.value, 10);
  let scaleValue = +imagePreviewElement.dataset.scaleValue;
  if(zoomValue < MAX_ZOOM) {
    zoomValue += ZOOM_STEP;
    scaleValue += SCALE_STEP;
    zoomValueElement.value = `${zoomValue}%`;
    imagePreviewElement.dataset.scaleValue = `${scaleValue}`;
    imagePreviewElement.style.transform = `scale(${scaleValue})`;
  }
};

export {onPictureDecrement, onPictureIncrement};
