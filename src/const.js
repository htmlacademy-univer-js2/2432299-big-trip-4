export const CITIES = [
  'Paris',
  'Toronto',
  'Leipzig',
  'Moscow',
  'Hongkong',
  'Tokyo',
  'Milan'
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

export const CountOffers = {
  MIN: 1,
  MAX: 5
};

export const POINT_TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

export const EMPTY_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

export const OFFERS_TITLE = [
  'Upgrade to a business class',
  'Add luggage',
  'Add meal',
  'Choose seats',
  'Travel by train'
];

export const PointsCount = {
  MIN: 0,
  MAX: 4
};


export const MS_IN_DAY = 86400000;

export const MS_IN_HOUR = 3600000;

export const FILTERS = ['Everything', 'Future', 'Present', 'Past'];

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
  EDIT: 'edit'
};
