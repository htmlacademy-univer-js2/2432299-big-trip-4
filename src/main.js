import TripPresenter from './presenter/trip-presenter.js';

import PointsApiService from './service/point-api-service.js';

import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import SortModel from './model/sort-model.js';

import { ENDPOINT } from './const.js';

const Authorization = 'Basic uqSj0dgT47ZwDbY';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');

const pointApiService = new PointsApiService(ENDPOINT, Authorization);
const destinationsModel = new DestinationsModel(pointApiService);
const offersModel = new OffersModel(pointApiService);
const filterModel = new FilterModel();
const sortModel = new SortModel();

const pointsModel = new PointsModel(
  pointApiService,
  destinationsModel,
  offersModel
);

const tripPresenter = new TripPresenter(
  eventListElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  sortModel
);

tripPresenter.init();
pointsModel.init();
