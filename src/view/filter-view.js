import AbstractView from '../framework/view/abstract-view.js';

import { createFiltersTemplate } from '../template/filter-template.js';

import { upperFirst } from '../utils/utils.js';

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #filterTypeHandler = null;

  constructor(currentFilterType, filterTypeHandler) {
    super();

    this.#currentFilter = currentFilterType;
    this.#filterTypeHandler = filterTypeHandler;
    this.element.addEventListener('change', this.#onFilterTypeChange);
  }

  get template(){
    return createFiltersTemplate(this.#currentFilter);
  }

  #onFilterTypeChange = (evt) => {
    if (this.#currentFilter === upperFirst(evt.target.value)) {
      return;
    }
    this.#filterTypeHandler(upperFirst(evt.target.value));
  };
}
