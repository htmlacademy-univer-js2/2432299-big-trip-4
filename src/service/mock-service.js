import { generateDestinations } from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';
import { generatePoints } from '../mock/point.js';
import { getRandomElement, getRandomInt } from '../utils/utils.js';

import { PointsCount, OffersCount, PointType } from '../const.js';

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = generateDestinations();
    this.#offers = this.#generateOffers();
    this.#points = this.#generatePoints();
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  #generateOffers = () => Object.values(PointType).map((type) => {
    const length = getRandomInt(OffersCount.MIN, OffersCount.MAX);
    return {
      type,
      offers: Array.from({length: length}, () => generateOffer())
    };
  });

  #generatePoints = () => Array.from({length: getRandomInt(PointsCount.MIN, PointsCount.MAX)}, () => {
    const type = getRandomElement(Object.values(PointType));
    const destinations = getRandomElement(this.#destinations);
    const hasOffers = getRandomInt(0, 1);
    const offersByType = this.#offers.find((offer) => offer.type === type);

    let offerIds = [];

    if (hasOffers) {
      offerIds = offersByType.offers.map((offer) => offer.id);
    }

    return generatePoints(type, destinations.id, offerIds);
  });
}
