import {renderThumbnails} from './thumbnail-rendering.js';
import {onImageEditBoxClose} from './photo-modal.js';
import {setFormSubmit} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {filterThumbnails, sortThumbnails} from './thumbnail-filter.js';
import {debounce} from './util.js';

getData()
  .then((photos) => {

    filterThumbnails(photos, debounce(renderThumbnails));
    renderThumbnails(sortThumbnails());
  })
  .catch((err) => showAlert(err.message));
//--------------------------------

setFormSubmit(onImageEditBoxClose);

