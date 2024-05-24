import AbstractView from '../framework/view/abstract-view.js';

import { createFilterTemplate } from '../template/filter-template.js';

export default class FilterView extends AbstractView {
  #filter = null;

  constructor(activeFilter) {
    super();

    this.#filter = activeFilter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
