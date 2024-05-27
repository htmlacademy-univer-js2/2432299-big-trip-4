import { PointType, CITIES } from '../const.js';

const createPicturesTemplate = (pictures) => {
  let template = '';

  if (pictures.length) {
    pictures.forEach((picture) => (template += `<img class="event__photo" src=${picture.src} alt="Event photo">`));

    return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${template}
      </div>
    </div>
    `;
  }

  return template;
};

const createEventTypeTemplate = () => {
  let template = '';

  Object.values(PointType).forEach((type, index) => {
    const lowerCaseTypeName = type.toLowerCase();

    template += `
      <div class="event__type-item">
        <input id="event-type-${lowerCaseTypeName}-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label label class="event__type-label  event__type-label--${lowerCaseTypeName}" for="event-type-${lowerCaseTypeName}-${index + 1}">${type}</label>
      </div>
      `;
  });

  return template;
};

const createDestinationList = () => {
  let template = '';

  CITIES.forEach((city) => {
    template += `<option value="${city}"></option>`;
  });

  return template;
};

const createOffersTemplate = (offers) => {
  let template = '';

  Object.values(offers).forEach((offer, index) => {
    template += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index + 1}" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-${index + 1}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  });

  return template;
};

const createPointEditTemplate = (point, destination, offers) => `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeTemplate(offers, point.type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationList()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${point.basePrice}" ${point.basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate(offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination ? destination.description : ''}</p>
        ${createPicturesTemplate(destination ? destination.pictures : '')}
      </section>
    </section>
  </form>
  </li>`;

export { createPointEditTemplate };
