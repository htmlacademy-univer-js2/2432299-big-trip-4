import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #service = null;
  #offers = [];

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }

  get = () => this.#offers;

  getByType = (type) => this.#offers.find((offer) => offer.type === type);
}
