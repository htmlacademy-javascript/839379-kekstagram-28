const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesElement = document.querySelector('.pictures');

const renderThumbnails = (photoObjects) => {
  const thumbnailsElement = document.querySelectorAll('.picture');
  thumbnailsElement.forEach((thumbnail) => thumbnail.remove());
  const photoObjectsFragment = document.createDocumentFragment();
  photoObjects.forEach(({id, url, likes, comments})=> {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.dataset.thumbnailId = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    photoObjectsFragment.append(pictureElement);
  });
  picturesElement.append(photoObjectsFragment);
};

export {picturesElement, renderThumbnails};
