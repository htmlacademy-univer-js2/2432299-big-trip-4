import { FILTERS } from '../const.js';

const createFilterTemplate = (activeFilter) => {
  let result = '';

  FILTERS.forEach((filter) => {
    const check = activeFilter === filter ? 'checked' : 'disabled';

    result += `
      <div class="trip-filters__filter">
        <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" ${check}>
        <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
      </div>
      `;
  });

  return `
    <form class="trip-filters" action="#" method="get">
      ${result}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `;
};

export { createFilterTemplate };
