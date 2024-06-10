export const DateFormat = {
  LONG: 'YYYY-MM-DDTHH:mm',
  SHORT: 'MMM DD',
  TIME: 'HH:mm'
};

export const Mode = {
  DEFAULT: 'default',
  EDITING: 'edit',
};

export const Filters = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

export const EmptyListMessage = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.FUTURE]: 'There are no future events now',
  [Filters.PRESENT]: 'There are no present events now',
  [Filters.PAST]: 'There are no past events now'
};

export const Sorts = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const EnabledSorts = {
  [Sorts.DAY]: true,
  [Sorts.EVENT]: false,
  [Sorts.TIME]: true,
  [Sorts.PRICE]: true,
  [Sorts.OFFERS]: false
};

export const ButtonLabel = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save',
  DELETE_IN_PROGRESS: 'Deleting...',
  SAVE_IN_PROGRESS: 'Saving...'
};

export const EMPTY_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight',
};

export const UserAction = {
  UPDATE_POINT: 'Update',
  ADD_POINT: 'Add',
  DELETE_POINT: 'Delete',
};

export const FormType = {
  EDITING: 'Edit',
  CREATING: 'Create',
};

export const UpdateType = {
  PATCH: 'Patch',
  INIT: 'Init',
  MAJOR: 'Major',
  MINOR: 'Minor'
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const ENDPOINT = 'https://21.objects.htmlacademy.pro/big-trip';

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const MSCount = {
  MSEC_IN_HOUR: 3600000,
  MSEC_IN_DAY: 86400000
};
