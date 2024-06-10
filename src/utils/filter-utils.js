import { isPointFuture, isPointPresent, isPointPast } from './time-utils.js';

import { Filters } from '../const.js';

export const filterMethod = {
  [Filters.EVERYTHING]: (points) => points.slice(),
  [Filters.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [Filters.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [Filters.PAST]: (points) => points.filter((point) => isPointPast(point)),
};
