import { createTripInfoTemplate } from '../template/trip-info-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor(destinations, points) {
    super();

    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#destinations, this.#points);
  }
}
