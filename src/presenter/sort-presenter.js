import SortView from '../view/sort-view.js';

import { render, replace, remove } from '../framework/render.js';

import { EnabledSorts, Sorts } from '../const.js';

export default class SortPresenter {
  #container = null;
  #sortComponent = null;
  #handleSortChange = null;
  #currentSortType = null;

  constructor({ container, currentSortType, onSortChange }) {
    this.#container = container;
    this.#currentSortType = currentSortType;
    this.#handleSortChange = onSortChange;
  }

  get sortItems() {
    return Object.values(Sorts).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !EnabledSorts[type],
    }));
  }

  init() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      items: this.sortItems,
      onItemChange: this.#sortChangeHandler,
    });

    if (!prevSortComponent) {
      render(this.#sortComponent, this.#container);
      return;
    }

    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  destroy() {
    remove(this.#sortComponent);
  }

  #sortChangeHandler = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#handleSortChange(sortType);
    }
  };
}
