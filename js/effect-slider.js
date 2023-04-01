import {imagePreviewElement, sliderContainerElement} from './photo-modal.js';

const effects = {
  chrome: {
    effect: 'chrome',
    currentStyle: 'grayscale',
  },
  sepia: {
    effect: 'sepia',
    currentStyle: 'sepia',
  },
  marvin: {
    effect: 'marvin',
    currentStyle: 'invert',
  },
  phobos: {
    effect: 'phobos',
    currentStyle: 'blur',
  },
  heat: {
    effect: 'heat',
    currentStyle: 'brightness',
  },
};

const units = {
  pixel: 'px',
  percent: '%'
};


const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');

const getInit = (min, max, start, step, connect = 'lower') =>
  ({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
    connect: connect,
  });

const onEffectUpdate = (effect, unit = '') => {
  effectSliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = effectSliderElement.noUiSlider.get();
    imagePreviewElement.style.filter = `${effect}(${effectSliderElement.noUiSlider.get()}${unit})`;
    sliderContainerElement.style.display = 'block';
  });
};

noUiSlider.create(effectSliderElement, getInit(0, 100, 100, 1));

const onPreviewCreateEffect = (evt) => {
  const currentEffect = evt.target.value;
  imagePreviewElement.className = '';
  imagePreviewElement.classList.add(`effects__preview--${currentEffect}`);
  switch (evt.target.value) {
    case effects.chrome.effect:
      effectSliderElement.noUiSlider.updateOptions(getInit(0, 1, 1, 0.1));
      onEffectUpdate(effects.chrome.currentStyle);
      break;
    case effects.sepia.effect:
      effectSliderElement.noUiSlider.updateOptions(getInit(0, 1, 1, 0.1));
      onEffectUpdate(effects.sepia.currentStyle);
      break;
    case effects.marvin.effect:
      effectSliderElement.noUiSlider.updateOptions(getInit(0, 100, 100, 1));
      onEffectUpdate(effects.marvin.currentStyle, units.percent);
      break;
    case effects.phobos.effect:
      effectSliderElement.noUiSlider.updateOptions(getInit(0, 3, 3, 0.1));
      onEffectUpdate(effects.phobos.currentStyle, units.pixel);
      break;
    case effects.heat.effect:
      effectSliderElement.noUiSlider.updateOptions(getInit(1, 3, 3, 0.1));
      onEffectUpdate(effects.heat.currentStyle);
      break;
    default:
      imagePreviewElement.style.filter = 'none';
      sliderContainerElement.style.display = 'none';
      break;
  }
};

export {onPreviewCreateEffect};

