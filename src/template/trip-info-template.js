const createTripInfoTitle = (destinations) => destinations.map((d) => d.name).join(' &mdash; ');

const getResultPrice = (points) => points.map((point) => Number(point.basePrice)).reduce((a, b) => a + b);

const createTripInfoTemplate = (destinations, points) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createTripInfoTitle(destinations)}</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getResultPrice(points)}</span>
    </p>
  </section>
  `;

export { createTripInfoTemplate };
