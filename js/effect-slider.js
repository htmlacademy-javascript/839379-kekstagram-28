import {imagePreviewElement, sliderContainerElement} from './photo-modal.js';

const SLIDER_WRAP = 'block';
const DEFAULT_WRAP = 'none';
const PREVIEW_WRAP = 'effects__preview--';

const Effects = {
  DEFAULT: {
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    START_VALUE: 100,
    STEP: 1,
  },
  CHROME: {
    EFFECT: 'chrome',
    CURRENT_STYLE: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    START_VALUE: 1,
    STEP: 0.1,
  },
  SEPIA: {
    EFFECT: 'sepia',
    CURRENT_STYLE: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    START_VALUE: 1,
    STEP: 0.1,
  },
  MARVIN: {
    EFFECT: 'marvin',
    CURRENT_STYLE: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    START_VALUE: 100,
    STEP: 1,
  },
  PHOBOS: {
    EFFECT: 'phobos',
    CURRENT_STYLE: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    START_VALUE: 3,
    STEP: 0.1,
  },
  HEAT: {
    EFFECT: 'heat',
    CURRENT_STYLE: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    START_VALUE: 3,
    STEP: 0.1,
  },
};

const Units = {
  PIXEL: 'px',
  PERCENT: '%'
};

const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');

const getInit = (min, max, start, step, connect = 'lower') =>
  ({
    range: {
      min,
      max,
    },
    start,
    step,
    connect,
  });

const onEffectUpdate = (effect, unit = '') => {
  effectSliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = effectSliderElement.noUiSlider.get();
    imagePreviewElement.style.filter = `${effect}(${effectSliderElement.noUiSlider.get()}${unit})`;
    sliderContainerElement.style.display = SLIDER_WRAP;
  });
};

noUiSlider.create(effectSliderElement, getInit(Effects.DEFAULT.MIN_VALUE, Effects.DEFAULT.MAX_VALUE, Effects.DEFAULT.START_VALUE, Effects.DEFAULT.STEP));

const onPreviewCreateEffect = (evt) => {
  const currentEffect = evt.target.value;
  imagePreviewElement.className = '';
  imagePreviewElement.classList.add(`${PREVIEW_WRAP}${currentEffect}`);
  switch (evt.target.value) {
    case Effects.CHROME.EFFECT:
      effectSliderElement.noUiSlider.updateOptions(getInit(Effects.CHROME.MIN_VALUE, Effects.CHROME.MAX_VALUE, Effects.CHROME.START_VALUE, Effects.CHROME.STEP));
      onEffectUpdate(Effects.CHROME.CURRENT_STYLE);
      break;
    case Effects.SEPIA.EFFECT:
      effectSliderElement.noUiSlider.updateOptions(getInit(Effects.SEPIA.MIN_VALUE, Effects.SEPIA.MAX_VALUE, Effects.SEPIA.START_VALUE, Effects.SEPIA.STEP));
      onEffectUpdate(Effects.SEPIA.CURRENT_STYLE);
      break;
    case Effects.MARVIN.EFFECT:
      effectSliderElement.noUiSlider.updateOptions(getInit(Effects.MARVIN.MIN_VALUE, Effects.MARVIN.MAX_VALUE, Effects.MARVIN.START_VALUE, Effects.MARVIN.STEP));
      onEffectUpdate(Effects.MARVIN.CURRENT_STYLE, Units.PERCENT);
      break;
    case Effects.PHOBOS.EFFECT:
      effectSliderElement.noUiSlider.updateOptions(getInit(Effects.PHOBOS.MIN_VALUE, Effects.PHOBOS.MAX_VALUE, Effects.PHOBOS.START_VALUE, Effects.PHOBOS.STEP));
      onEffectUpdate(Effects.PHOBOS.CURRENT_STYLE, Units.PIXEL);
      break;
    case Effects.HEAT.EFFECT:
      effectSliderElement.noUiSlider.updateOptions(getInit(Effects.HEAT.MIN_VALUE, Effects.HEAT.MAX_VALUE, Effects.HEAT.START_VALUE, Effects.HEAT.STEP));
      onEffectUpdate(Effects.HEAT.CURRENT_STYLE);
      break;
    default:
      imagePreviewElement.style.filter = DEFAULT_WRAP;
      sliderContainerElement.style.display = DEFAULT_WRAP;
      break;
  }
};

export {onPreviewCreateEffect};

