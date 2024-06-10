import AbstractView from '../framework/view/abstract-view.js';

import { createNewPointButtonTemplate } from '../template/new-point-button-template.js';

export default class NewPointButtonView extends AbstractView {
  #handleClick = null;

  constructor(onClick) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  setDisabled = (isDisabled) => {
    this.element.disabled = isDisabled;
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
