import { getDuration } from './time-utils.js';
import { EmptyPoint } from '../const.js';

export const getRandomInt = (a, b) => Math.floor(a + Math.random() * (b - a + 1));

export const getRandomElement = (items) => items[getRandomInt(0, items.length - 1)];

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const isEscapeKey = (key) => key === 'Escape';

export const isBigDifference = (pointA, pointB) =>
  pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || getDuration(pointA.dateFrom, pointA.dateTo) !== getDuration(pointB.dateFrom, pointB.dateTo);

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

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);
