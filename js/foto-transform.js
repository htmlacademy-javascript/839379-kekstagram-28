import {zoomValueElement, imagePreviewElement} from './form.js';


const onPictureDecrement = () => {
  let zoomValue = parseInt(zoomValueElement.value, 10);
  let scaleValue = +imagePreviewElement.dataset.scaleValue;
  if(zoomValue > 0) {
    zoomValue -= 25;
    scaleValue -= 0.25;
    zoomValueElement.value = `${zoomValue}%`;
    imagePreviewElement.dataset.scaleValue = `${scaleValue}`;
    imagePreviewElement.style.transform = `scale(${scaleValue})`;
  }
};

const onPictureIncrement = () => {
  let zoomValue = parseInt(zoomValueElement.value, 10);
  let scaleValue = +imagePreviewElement.dataset.scaleValue;
  if(zoomValue < 100) {
    zoomValue += 25;
    scaleValue += 0.25;
    zoomValueElement.value = `${zoomValue}%`;
    imagePreviewElement.dataset.scaleValue = `${scaleValue}`;
    imagePreviewElement.style.transform = `scale(${scaleValue})`;
  }
};

export {onPictureDecrement, onPictureIncrement};
