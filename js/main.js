import {renderThumbnails} from './thumbnail-rendering.js';
import {renderBigPhoto} from './photo-rendering.js';
import {onImageEditBoxClose} from './form.js';
import {onFormSubmit} from './validation.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData()
  .then((photos) => {
    // console.log(photos);
    renderThumbnails(photos);
    renderBigPhoto(photos);
  })
  .catch((err) => showAlert(err.message));
//--------------------------------

onFormSubmit(onImageEditBoxClose);

