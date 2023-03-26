import {renderThumbnails} from './thumbnail-rendering.js';
import {renderBigPhoto} from './photo-rendering.js';
import {onImageEditBoxClose} from './photo-modal.js';
import {onFormSubmit} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    renderBigPhoto(photos);
  })
  .catch((err) => showAlert(err.message));
//--------------------------------

onFormSubmit(onImageEditBoxClose);

