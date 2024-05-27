export const CITIES = [
  'Paris',
  'Toronto',
  'Leipzig',
  'Moscow',
  'Hongkong',
  'Tokyo',
  'Milan',
  'Cologne',
  'Liverpool',
  'Warsaw'
];

export const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

export const Price = {
  MIN: 1,
  MAX: 1000
};

export const Duration = {
  HOUR: 5,
  DAY: 5,
  MIN: 59
};

export const DateFormat = {
  LONG: 'YYYY-MM-DDTHH:mm',
  SHORT: 'MMM DD'
};

export const PicturesCount = {
  MIN: 0,
  MAX: 5
};

export const OffersCount = {
  MIN: 1,
  MAX: 5
};

export const PointsCount = {
  MIN: 0,
  MAX: 4
};

export const PointType = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant'
};

export const EmptyPoint = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'Flight'
};

export const OFFERS_TITLE = [
  'Upgrade to a business class',
  'Add luggage',
  'Add meal',
  'Choose seats',
  'Travel by train'
];

export const MS_IN_DAY = 86400000;

export const MS_IN_HOUR = 3600000;

export const Filters = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST:   'Past'
};

export const Sorts = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers'
};

export const FilterMessages = {
  'Everything': 'Click New Event to create your first point',
  'Future': 'There are no future events now',
  'Present': 'There are no present events now',
  'Past': 'There are no past events now'
};

export const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
  EMPTY_POINT: 'emptyPoint',
  EMPTY_LIST: 'emptyList'
};

export const UpdateType = {
  PATCH: 'Patch',
  MINOR: 'Minor',
  MAJOR: 'Major'
};

export const UserAction = {
  UPDATE_POINT: 'update',
  DELETE_POINT: 'delete',
  CREATE_POINT: 'create'
};
