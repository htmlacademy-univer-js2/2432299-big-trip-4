import { getPointsPriceDifference } from './point-utils.js';
import { getPointsDateDifference, getPointsDurationDifference } from './time-utils.js';

import { Sorts } from '../const.js';

const sortMethod = {
  [Sorts.DAY]: (points) => points.sort(getPointsDateDifference),
  [Sorts.PRICE]: (points) => points.sort(getPointsPriceDifference),
  [Sorts.TIME]: (points) => points.sort(getPointsDurationDifference),
};

export const sort = (points, sortType = Sorts.DAY) => sortMethod[sortType](points);
