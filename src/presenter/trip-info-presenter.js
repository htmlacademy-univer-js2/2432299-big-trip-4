import TripInfoView from '../view/trip-info-view.js';

import { RenderPosition, remove, render, replace } from '../framework/render.js';

import { getTripCost, getTripDates, getTripRoute } from '../utils/trip-info-utils.js';

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #container = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor(container, pointsModel, destinationsModel, offersModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderTripInfo();
    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  #renderTripInfo = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;

    const points = this.#pointsModel.get();
    const destinations = this.#destinationsModel.get();
    const offers = this.#offersModel.get();

    this.#tripInfoComponent = new TripInfoView(
      getTripRoute(points, destinations),
      getTripDates(points),
      getTripCost(points, offers),
      !points.length);

    if (!prevTripInfoComponent) {
      render(
        this.#tripInfoComponent,
        this.#container,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleModelChange = () => {
    this.#renderTripInfo();
  };
}
