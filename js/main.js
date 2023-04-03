import {renderThumbnails} from './thumbnail-rendering.js';
import {onEditBoxClose} from './photo-modal.js';
import {setFormSubmit} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {filterThumbnails, sortThumbnails} from './thumbnail-filter.js';
import {debounce} from './util.js';
import {renderPhotoCard} from './photo-rendering.js';

getData()
  .then((photos) => {
    filterThumbnails(photos, debounce(renderThumbnails));
    renderThumbnails(sortThumbnails());
    renderPhotoCard(photos);
  })
  .catch((err) => showAlert(err.message));

setFormSubmit(onEditBoxClose);
