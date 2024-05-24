import { createPointTemplate } from '../template/point-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor(point, destination, offers, onRollupClick, onFavoriteCLick) {
    super();

    this.#point = point;
    this.#pointDestination = destination;
    this.#pointOffers = offers;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', onRollupClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', onFavoriteCLick);
  }

  get template() {
    return createPointTemplate(this.#point, this.#pointDestination, this.#pointOffers);
  }
}
