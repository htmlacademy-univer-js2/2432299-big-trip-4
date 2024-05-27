import EventListView from '../view/event-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EmptyListView from '../view/empty-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import LoadingView from '../view/load-view';

import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import FilterPresenter from './filter-presenter.js';

import { render, RenderPosition, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import { sort } from '../utils/sort-utils.js';
import { filter } from '../utils/filter-utils.js';

import { EmptyPoint, Sorts, UpdateType, UserAction, Mode, TimeLimit } from '../const.js';

const bodyElement = document.body;
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterContainer = tripInfoElement.querySelector('.trip-controls__filters');

export default class TripPresenter {
  #eventListComponent = new EventListView();

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #tripInfoComponent = null;
  #messageComponent = null;
  #newPointButtonComponent = null;

  #filterPresenter = null;
  #sortPresenter = null;

  #container = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #sortModel = null;

  #currentSortType = Sorts.DAY;
  #pointPresenters = new Map();

  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(container, destinationsModel, offersModel, pointsModel, filterModel, sortModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#sortModel = sortModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#sortModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filteredPoints = filter[this.#filterModel.get()](this.#pointsModel.get());
    return sort[this.#currentSortType](filteredPoints);
  }

  #renderTripInfo() {
    this.#tripInfoComponent = new TripInfoView(
      this.points.map((point) => (
        this.#destinationsModel.getById(point.destination)
      )),
      this.points,
      [...this.#offersModel.get()]);

    render(this.#tripInfoComponent, tripInfoElement, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter(
      this.#sortModel.get(),
      this.#onSortComponentClick,
      this.#container,
    );

    this.#sortPresenter.init();
  }

  #renderFilters = () => {
    this.#filterPresenter = new FilterPresenter(
      filterContainer,
      this.#filterModel,
      this.#filterChangeHandler
    );

    this.#filterPresenter.init();
  };

  #renderEventList = () => render(this.#eventListComponent, this.#container);

  #renderEmptyList = () => {
    this.#messageComponent = new EmptyListView(this.#filterModel.get());
    render(this.#messageComponent, this.#eventListComponent.element);
  };

  #renderPoints() {
    this.points.forEach((point) => {
      const pointPresenter = new PointPresenter(
        this.#destinationsModel,
        this.#offersModel,
        this.#eventListComponent,
        this.#viewActionHandler,
        this.#modeChangeHandler
      );

      pointPresenter.init(point);

      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #renderNewPointButton = () => {
    this.#newPointButtonComponent = new NewPointButtonView(this.#newPointButtonClickHandler);
    render(this.#newPointButtonComponent, tripInfoElement);
  };

  #renderNewPoint = () => {
    const pointPresenter = new PointPresenter(
      this.#destinationsModel,
      this.#offersModel,
      this.#eventListComponent,
      this.#viewActionHandler,
      this.#modeChangeHandler
    );

    const point = {...EmptyPoint, id: crypto.randomUUID()};
    pointPresenter._mode = Mode.EMPTY_POINT;
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderBoard() {
    this.#renderFilters();
    this.#renderNewPointButton();

    if (this.points.length && !this.#isLoading) {
      this.#renderTripInfo();
      this.#renderSort();
      this.#renderEventList();
      this.#renderPoints();

      return;
    }

    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderEventList();
    this.#renderEmptyList();
  }

  #clearPoints() {
    this.#pointPresenters.forEach((pp) => {
      pp.removeComponent();
    });

    this.#pointPresenters = new Map();
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    remove(this.#tripInfoComponent);
    remove(this.#messageComponent);
    remove(this.#newPointButtonComponent);
    remove(this.#loadingComponent);

    this.#filterPresenter.remove();

    if (this.#sortPresenter) {
      this.#sortPresenter.remove();
    }

    if (resetSortType) {
      this.#currentSortType = Sorts.DAY;
    }
  };

  #renderLoading(){
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #onSortComponentClick = (sortType) => {
    this.#currentSortType = sortType;
    this.#sortModel.set(UpdateType.MINOR, sortType);
  };

  #filterChangeHandler = (filterType) => this.#filterModel.set(UpdateType.MAJOR, filterType);

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((point) => point.resetView());
  };

  #newPointButtonClickHandler = () => this.#renderNewPoint();

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.update(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.delete(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.CREATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.add(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  init() {

  }
}
