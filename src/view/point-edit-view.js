import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import flatpickr from 'flatpickr';

import { createPointEditTemplate } from '../template/point-edit-template.js';

import { EmptyPoint } from '../const.js';

import 'flatpickr/dist/flatpickr.min.css';

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #resetClickHandler = null;
  #formSubmitHandler = null;
  #destinationsModel = null;
  #offersModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point = EmptyPoint, resetClickHandler, formSubmitHandler, destinationsModel, offersModel) {
    super();

    this.#point = point;

    this.#resetClickHandler = resetClickHandler;
    this.#formSubmitHandler = formSubmitHandler;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointDestination = destinationsModel.getById(point.destination);
    this.#pointOffers = this.#offersModel.getByType(point.type);

    this._setState({point: point});
    this._restoreHandlers();
  }

  #onTypeChange = (evt) => {
    const type = evt.target.value;
    this.#pointOffers = this.#offersModel.getByType(type);

    const offersIds = this.#pointOffers.map((offer) => offer.id);

    this.updateElement({ point: {
      ...this._state.point,
      type: type,
      offers: offersIds}
    });
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();

    this.#pointDestination = this.#destinationsModel.getByName(evt.target.value);

    if (this.#pointDestination) {
      this.updateElement({point:{
        ...this._state.point,
        destination: this.#pointDestination.id
      }});
    }
  };

  #onOfferChange = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox'));

    this._setState({
      point: {
        ...this._state.point,
        offers: checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #onPriceChange = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value
      }
    });
  };

  #onResetClick = () => {
    this.updateElement({ point: this.#point });
    this.#resetClickHandler();
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#point = this._state.point;
    this.#formSubmitHandler({...this.#point});
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });

    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });

    this.#datepickerFrom.set('minDate', this._state.point.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayDfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.point.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.point.dateFrom
      }
    );
  };

  _restoreHandlers = () => {
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#onResetClick);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onResetClick);

    this.element
      .querySelector('form')
      .addEventListener('submit', this. #onFormSubmit);

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((eventType) => eventType
        .addEventListener('change', this.#onTypeChange));

    this.element
      .querySelector('.event__input')
      .addEventListener('change', this.#onDestinationChange);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#onPriceChange);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#onOfferChange);

    this.#setDatepickers();
  };

  get template() {
    return createPointEditTemplate(this._state.point, this.#pointDestination, this.#pointOffers);
  }
}
