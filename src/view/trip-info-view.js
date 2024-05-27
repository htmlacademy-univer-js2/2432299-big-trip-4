import AbstractView from '../framework/view/abstract-view.js';

import { createTripInfoTemplate } from '../template/trip-info-template.js';

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(destinations, points, offers) {
    super();

    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#destinations, this.#points, this.#offers);
  }
}
