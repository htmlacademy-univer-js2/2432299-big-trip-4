import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { DateFormat, MSCount } from '../const.js';

dayjs.extend(duration);

export const formatToLongDate = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

export const formatToShortDate = (time) => time ? dayjs(time).format(DateFormat.SHORT) : '';

export const formatToShortTime = (time) => time ? dayjs(time).format(DateFormat.TIME) : '';

export const getDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));
  const days = dayjs.duration(timeDiff).days()
    + dayjs.duration(timeDiff).months() * 31
    + dayjs.duration(timeDiff).years() * 365;
  const hours = dayjs.duration(timeDiff).hours();
  const minutes = dayjs.duration(timeDiff).minutes();

  if (timeDiff >= MSCount.MSEC_IN_DAY) {
    return dayjs.duration({ days, hours, minutes }).format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= MSCount.MSEC_IN_HOUR) {
    return dayjs.duration({ days, hours, minutes }).format('HH[H] mm[M]');
  }
  return dayjs.duration({ days, hours, minutes }).format('mm[M]');
};

export const getPointsDateDifference = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const getPointsDurationDifference = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationB - durationA;
};

export const isPointFuture = (point) => dayjs().isBefore(point.dateFrom);

export const isPointPast = (point) => dayjs().isAfter(point.dateTo);

export const isPointPresent = (point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);

