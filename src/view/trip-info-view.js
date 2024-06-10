import AbstractView from '../framework/view/abstract-view.js';

import { createTripInfoTemplate } from '../template/trip-info-template.js';

export default class TripInfoView extends AbstractView {
  #route = null;
  #dates = null;
  #cost = null;
  #isEmpty = true;

  constructor(route, dates, cost, isEmpty) {
    super();
    this.#route = route;
    this.#dates = dates;
    this.#cost = cost;
    this.#isEmpty = isEmpty;
  }

  get template() {
    return createTripInfoTemplate(this.#route, this.#dates, this.#cost, this.#isEmpty,);
  }
}
