import { EmptyPoint } from '../const.js';
import { getDuration } from './time-utils.js';

import dayjs from 'dayjs';

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const isPointEmpty = (point) => {
  const p = Object.values(point);
  const p2 = Object.values({...EmptyPoint});

  for (let i = 0; i < p.length - 1; i++) {
    if (p[i] !== p2[i]) {
      return false;
    }
  }

  return true;
};

export const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    isFavorite: point['is_favorite']
  };

  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
};

export const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    isFavorite: point['is_favorite']
  };

  delete adaptedPoint.basePrice;
  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};

export const isBigDifference = (pointA, pointB) =>
  pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || getDuration(pointA.dateFrom, pointA.dateTo) !== getDuration(pointB.dateFrom, pointB.dateTo);


export const getEndPoint = (points) => {
  let endPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currentPointDate = points[i].endDate;
    const endPointDate = endPoint.endDate;
    if (dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') > 0 ||
      dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0 &&
      dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') > 0) {
      endPoint = points[i];
    }
  }

  return endPoint;
};

export const getStartPoint = (points) => {
  let startPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currentPointDate = points[i].startDate;
    const endPointDate = startPoint.startDate;
    if(dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') < 0 ||
      dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0 &&
      dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') < 0) {
      startPoint = points[i];
    }
  }
  return startPoint;
};
