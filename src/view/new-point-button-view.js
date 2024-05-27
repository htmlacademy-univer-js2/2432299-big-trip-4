import AbstractView from '../framework/view/abstract-view.js';

import { createNewPointButtonTemplate } from '../template/new-point-button-template.js';

export default class NewPointButtonView extends AbstractView {
  constructor(onPointButtonClick) {
    super();

    this.element.addEventListener('click', onPointButtonClick);
  }

  get template() {
    return createNewPointButtonTemplate();
  }
}
