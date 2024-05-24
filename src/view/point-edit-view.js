import { createPointEditTemplate } from '../template/point-edit-template.js';
import { EMPTY_POINT } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onSubmit = null;
  #onCloseButtonClick = null;

  #onResetClick = null;
  #onFormSubmit = null;

  #destinationsModel = null;
  #offersModel = null;

  #currentType = null;

  constructor(point = EMPTY_POINT, pointDestination, pointOffers, onResetButtonClick, onFormSubmit, destinationsModel, offersModel) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;

    this.#onResetClick = onResetButtonClick;
    this.#onFormSubmit = onFormSubmit;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this._setState({point: point});
    this._restoreHandlers();
  }

  #typeChangeHandler = (evt) => {
    this.#currentType = evt.target.value;
    this.#pointOffers = this.#offersModel.getByType(this.#currentType);

    const offersIds = this.#pointOffers.map((offer) => offer.id);

    this.updateElement({ point: {
      ...this._state.point,
      type: this.#currentType,
      offers: offersIds}
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.#pointDestination = this.#destinationsModel.get().find((destination) => destination.name === evt.target.value);

    if (this.#pointDestination) {
      this.updateElement({point:{
        ...this._state.point,
        destination: this.#pointDestination.id
      }});
    }
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox'));

    this._setState({
      point: {
        ...this._state.point,
        offers: checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.valueAsNumber
      }
    });
  };

  #handleResetClick = () => {
    this.updateElement({ point: this.#point });
    this.#onResetClick();
  };

  #handleSaveClick = (evt) => {
    evt.preventDefault();
    this.#point = this._state.point;
    this.#onFormSubmit({...this.#point});
  };

  _restoreHandlers = () => {
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#handleResetClick);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#handleResetClick);

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#handleSaveClick);

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((eventType) => eventType
        .addEventListener('change', this.#typeChangeHandler));

    this.element
      .querySelector('.event__input')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);
  };

  get template() {
    return createPointEditTemplate(this._state.point, this.#pointDestination, this.#pointOffers);
  }
}
