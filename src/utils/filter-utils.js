import dayjs from 'dayjs';
import { Filters } from '../const';

const filterByPast = (date, param) => dayjs().isAfter(dayjs(date), param);

const filterByFuture = (date, param) => dayjs().isBefore(dayjs(date), param) || dayjs().isSame(dayjs(date), param);

const filterByPresent = (point) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const startDate = new Date(point.startDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(point.endDate);
  endDate.setHours(0, 0, 0, 0);
  return startDate <= currentDate && endDate >= currentDate;
};

export const filter = {
  [Filters.EVERYTHING]: (points) => points,
  [Filters.FUTURE]: (points) => points.filter((point) => filterByFuture(point.startDate, 'D') || filterByFuture(point.endDate, 'D')),
  [Filters.PRESENT]: (points) => points.filter((point) => filterByPresent(point)),
  [Filters.PAST]: (points) => points.filter((point) => filterByPast(point.endDate, 'D') || filterByPast(point.startDate, 'D'))
};
