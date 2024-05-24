import { createSortTemplate } from '../template/sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  #onSortComponentClick = null;

  constructor(onSortClick) {
    super();

    this.#onSortComponentClick = onSortClick;

    this.element.querySelectorAll('.trip-sort__btn').forEach((sortButtonElement) => {
      sortButtonElement.addEventListener('click', this.#onSortComponentClick);
    });
  }

  get template() {
    return createSortTemplate();
  }
}
