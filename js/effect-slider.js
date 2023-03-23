import {imagePreviewElement, sliderContainerElement} from './form.js';

const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');


const effects = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const onPreviewCreateEffect = (evt) => {
  if(evt.target.matches('.effects__radio')) {
    const currentEffect = effects[evt.target.value];
    const otherEffects = Object.values(effects).filter((value) => value !== currentEffect);
    imagePreviewElement.classList.add(currentEffect);
    otherEffects.forEach((value) => imagePreviewElement.classList.remove(value));
    switch (evt.target.value) {
      case 'chrome':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1,
        });
        effectSliderElement.noUiSlider.on('update', () => {
          effectLevelElement.value = effectSliderElement.noUiSlider.get();
          imagePreviewElement.style.filter = `grayscale(${effectSliderElement.noUiSlider.get()})`;
          sliderContainerElement.style.display = 'block';
        });
        break;
      case 'sepia':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1,
        });
        effectSliderElement.noUiSlider.on('update', () => {
          effectLevelElement.value = effectSliderElement.noUiSlider.get();
          imagePreviewElement.style.filter = `sepia(${effectSliderElement.noUiSlider.get()})`;
          sliderContainerElement.style.display = 'block';
        });
        break;
      case 'marvin':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1,
        });
        effectSliderElement.noUiSlider.on('update', () => {
          effectLevelElement.value = effectSliderElement.noUiSlider.get();
          imagePreviewElement.style.filter = `invert(${effectSliderElement.noUiSlider.get()}%)`;
          sliderContainerElement.style.display = 'block';
        });
        break;
      case 'phobos':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1,
        });
        effectSliderElement.noUiSlider.on('update', () => {
          effectLevelElement.value = effectSliderElement.noUiSlider.get();
          imagePreviewElement.style.filter = `blur(${effectSliderElement.noUiSlider.get()}px)`;
          sliderContainerElement.style.display = 'block';
        });
        break;
      case 'heat':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1,
        });
        effectSliderElement.noUiSlider.on('update', () => {
          effectLevelElement.value = effectSliderElement.noUiSlider.get();
          imagePreviewElement.style.filter = `brightness(${effectSliderElement.noUiSlider.get()})`;
          sliderContainerElement.style.display = 'block';
        });
        break;
      default:
        imagePreviewElement.style.filter = 'none';
        sliderContainerElement.style.display = 'none';
        break;
    }
  }
};

export {onPreviewCreateEffect};

