import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';

import { Mode } from '../const.js';

import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';

export default class PointPresenter {

  #mode = Mode.DEFAULT;

  #destinationsModel = null;
  #offersModel = null;
  #point = null;

  #pointChangeHandler = null;
  #modeChangeHandler = null;

  #eventListComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #prevPointComponent = null;
  #prevPointEditComponent = null;

  constructor(destinationsModel, offersModel, eventListComponent, pointChangeHandler, modeChangeHandler) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventListComponent = eventListComponent;

    this.#pointChangeHandler = pointChangeHandler;
    this.#modeChangeHandler = modeChangeHandler;
  }

  #onKeyDown = (evt) => {
    if (isEscapeKey(evt.key)) {
      document.removeEventListener('keydown', this.#onKeyDown);
      this.#replaceFormToPoint();
    }
  };

  #replaceFormToPoint = () => {
    this.#mode = Mode.DEFAULT;

    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onKeyDown);
  };

  #replacePointToForm = () => {
    this.#modeChangeHandler();

    this.#mode = Mode.EDIT;

    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onKeyDown);
  };

  #onSubmitForm = (point) => {
    this.#replaceFormToPoint();
    this.#pointChangeHandler({...point, isFavorite: !point.isFavorite});
  };

  #onRollupButtonClick = () => {
    this.#replacePointToForm();
  };

  #onResetButtonClick = () => {
    this.#replaceFormToPoint();
  };

  #renderPoint = (point, destination, offers) => {
    this.#prevPointComponent = this.#pointComponent;
    this.#prevPointEditComponent = this.#pointEditComponent;

    const onFavoriteButtonCLick = () => this.#pointChangeHandler({...point, isFavorite: !point.isFavorite});

    this.#pointComponent = new PointView(
      point,
      destination,
      offers,
      this.#onRollupButtonClick,
      onFavoriteButtonCLick);

    this.#pointEditComponent = new PointEditView(
      point,
      destination,
      offers,
      this.#onResetButtonClick,
      this.#onSubmitForm,
      this.#destinationsModel,
      this.#offersModel);

    if (!(this.#prevPointComponent && this.#prevPointEditComponent)) {
      render(this.#pointComponent, this.#eventListComponent.element);

      return;
    }

    replace(this.#pointComponent, this.#prevPointComponent);
  };

  init(point) {
    this.#point = point;

    this.#renderPoint(
      this.#point,
      this.#destinationsModel.getById(this.#point.destination),
      this.#offersModel.getByType(this.#point.type));
  }

  resetView = () => {
    if (this.#mode === Mode.EDIT) {
      this.#onResetButtonClick();
    }
  };

  removeComponent = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };
}
