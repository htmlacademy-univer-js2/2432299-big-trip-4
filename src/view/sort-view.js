import AbstractView from '../framework/view/abstract-view.js';

import { createSortTemplate } from '../template/sort-template.js';

import { isSortTypeAllowed } from '../utils/sort-utils.js';


export default class SortView extends AbstractView {
  #onSortComponentClick = null;
  #currentSort = null;

  constructor(currentSort, onSortClick) {
    super();

    this.#onSortComponentClick = onSortClick;
    this.#currentSort = currentSort;

    this.element.querySelectorAll('.trip-sort__btn').forEach((sortButtonElement) => {
      if (isSortTypeAllowed(sortButtonElement.textContent)) {
        sortButtonElement.addEventListener('click', this.#onSortComponentClick);
        sortButtonElement.addEventListener('click', this.#onSortTypeChange);
      }
    });
  }

  #onSortTypeChange = (evt) => {
    if (this.#currentSort === evt.target.textContent) {
      return;
    }
    this.#onSortComponentClick(evt.target.textContent);
  };


  get template() {
    return createSortTemplate();
  }
}
