import { formatToShortDate } from '../utils/time-utils.js';

const createTripInfoTitle = (destinations) => {
  if (destinations.length > 3) {
    const firstName = destinations[0].name;
    const lastName = destinations[destinations.length - 1].name;

    return [firstName, lastName].join(' &mdash; ...  &mdash; ');
  }
  return destinations.map((d) => d.name).join(' &mdash; ');
};

const getResultPrice = (points, offers) => {
  let sum = 0;
  let checkedOffers = [];
  let offersByType = null;

  points.forEach((point) => {
    checkedOffers = point.offers;
    offersByType = offers.find((offer) => offer.type === point.type);

    if (checkedOffers.length) {
      checkedOffers.forEach((checked) => {
        sum += offersByType.offers.find((offer) => offer.id === checked).price;
      });
    }

    sum += point.basePrice;
  });

  return sum;
};

const createTripInfoTemplate = (destinations, points, offers) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createTripInfoTitle(destinations)}</h1>
      <p class="trip-info__dates">${formatToShortDate(points[points.length - 1].dateTo)}&nbsp;&mdash;&nbsp;${formatToShortDate(points[0].dateTo)}</p>
    </div>
    <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${getResultPrice(points, offers)}</span></p>
  </section>
  `;

export { createTripInfoTemplate };
