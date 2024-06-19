import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

import PointService from './service/point-api-service.js';

import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';

import { ENDPOINT } from './const.js';

const tripElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');
const filtersElement = tripElement.querySelector('.trip-controls__filters');

const Authorization = 'Basic uqSj0dgT7ZwDbY';

const service = new PointService(ENDPOINT, Authorization);

const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel(service, destinationsModel, offersModel);
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter(tripElement, pointsModel, destinationsModel, offersModel);

const newPointButtonPresenter = new NewPointButtonPresenter(tripElement);

const filterPresenter = new FilterPresenter(filtersElement, pointsModel, filterModel);

const tripPresenter = new TripPresenter(
  eventListElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonPresenter
);

newPointButtonPresenter.init(tripPresenter.handleNewPointClick);

filterPresenter.init();
tripPresenter.init();
pointsModel.init();
tripInfoPresenter.init();
