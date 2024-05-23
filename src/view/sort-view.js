import { createSortTemplate } from '../template/sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  #numberSort = null;
  #onSortComponentClick = null;

  constructor(numberSort, onComponentSortClick) {
    super();

    this.#numberSort = numberSort;
    this.#onSortComponentClick = onComponentSortClick;

    this.element.querySelectorAll('.trip-sort__btn').forEach((sortButtonElement) =>
      sortButtonElement.addEventListener('click', this.#onSortComponentClick));
  }

  get template() {
    return createSortTemplate(this.#numberSort);
  }
}
