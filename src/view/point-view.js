import { createPointTemplate } from '../template/point-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onEditButtonClick = null;

  constructor(point, pointDestination, pointOffers, onEditButtonClick, onFavoriteButtonCLick) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onEditButtonClick = onEditButtonClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditButtonClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', onFavoriteButtonCLick);
  }

  get template() {
    return createPointTemplate(this.#point, this.#pointDestination, this.#pointOffers);
  }
}
