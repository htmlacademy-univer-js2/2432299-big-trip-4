import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadView from '../view/load-view.js';
import ErrorView from '../view/error-view.js';

import NewPointPresenter from '../presenter/new-point-presenter.js';
import PointPresenter from '../presenter/point-presenter.js';
import SortPresenter from '../presenter/sort-presenter.js';

import { render, remove, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import { sort } from '../utils/sort-utils.js';
import { filterMethod } from '../utils/filter-utils.js';

import { Filters, Sorts, TimeLimit, UpdateType, UserAction } from '../const.js';

export default class TripPresenter {
  #container = null;
  #emptyListComponent = null;
  #errorComponent = new ErrorView();
  #loadingComponent = new LoadView();
  #pointListComponent = new PointListView();

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #newPointButtonPresenter = null;
  #sortPresenter = null;
  #currentSortType = Sorts.DAY;

  #isCreating = false;
  #isLoading = true;
  #isError = false;

  #blocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor(
    container, destinationsModel, offersModel, pointsModel, filterModel, newPointButtonPresenter
  ) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#newPointPresenter = new NewPointPresenter(
      this.#pointListComponent.element,
      this.#destinationsModel,
      this.#offersModel,
      this.#handlePointChange,
      this.#handleNewPointDestroy
    );

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderTrip();
  }

  get points() {
    const currentFilter = this.#filterModel.get();
    const points = this.#pointsModel.get();

    const filteredPoints = filterMethod[currentFilter](points);
    return sort(filteredPoints, this.#currentSortType);
  }

  handleNewPointClick = () => {
    this.#isCreating = true;
    this.#currentSortType = Sorts.DAY;
    this.#filterModel.set(UpdateType.MAJOR, Filters.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #handleNewPointDestroy = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if (!this.points.length && isCanceled) {
      this.#clearTrip();
      this.#renderTrip();
    }
  };

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderLoader();
      this.#newPointButtonPresenter.disableButton();
      return;
    }

    this.#newPointButtonPresenter.enableButton();

    if (this.#isError) {
      this.#renderError();
      this.#clearTrip({ resetSortType: true });
      return;
    }

    if (!this.points.length && !this.#isCreating) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#clearPoints();
    remove(this.#emptyListComponent);
    remove(this.#loadingComponent);
    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
    }

    if (resetSortType) {
      this.#currentSortType = Sorts.DAY;
    }
  };

  #renderSort = () => {
    this.#sortPresenter = new SortPresenter({
      container: this.#container,
      currentSortType: this.#currentSortType,
      onSortChange: this.#handleSortChange,
    });

    this.#sortPresenter.init();
  };

  #renderLoader = () => {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderError = () => {
    render(this.#errorComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#container);
  };

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView(
      this.#filterModel.get(),
    );
    render(this.#emptyListComponent, this.#container);
  };

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handlePointChange = async (action, updateType, point) => {
    this.#blocker.block();
    switch (action) {
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.add(updateType, point);
        } catch {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(point.id).setSaving();
        try {
          await this.#pointsModel.update(updateType, point);
        } catch {
          this.#pointPresenters.get(point.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(point.id).setDeleting();
        try {
          await this.#pointsModel.delete(updateType, point);
        } catch {
          this.#pointPresenters.get(point.id).setAborting();
        }
        break;
    }

    this.#blocker.unblock();
  };

  #handleModelChange = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        if (data.error) {
          this.#isLoading = false;
          this.#isError = true;
        } else {
          this.#isLoading = false;
          this.#isError = false;
          remove(this.#loadingComponent);
        }
        this.#renderTrip();
        break;
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #handleSortChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };
}
