import { Sorts } from '../const.js';
import { isSortTypeAllowed } from '../utils/sort-utils.js';

const createSortTemplate = () => {
  let result = '';
  let lowerCaseSortName = '';

  Object.values(Sorts).forEach((sort) => {
    lowerCaseSortName = sort.toLowerCase();

    result += `
      <div class="trip-sort__item  trip-sort__item--${lowerCaseSortName}">
        <input id="sort-${lowerCaseSortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${lowerCaseSortName}"
        ${sort === Sorts.DAY ? 'checked' : ''}
        ${isSortTypeAllowed(sort) ? '' : 'disabled'}>
        <label class="trip-sort__btn" for="sort-${lowerCaseSortName}">${sort}</label>
      </div>
      `;
  });

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${result}
    </form>
    `;
};


export { createSortTemplate };
