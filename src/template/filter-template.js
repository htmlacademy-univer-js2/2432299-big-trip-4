import { Filters } from '../const.js';

const createFilterElements = (currentFilterType) => {
  let template = '';

  Object.values(Filters).forEach((filter) => {
    const checked = filter === currentFilterType ? 'checked' : '';
    const lowerCaseFilterName = filter.toLowerCase();

    template += `<div class="trip-filters__filter">
        <input id="filter-${lowerCaseFilterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
        value="${lowerCaseFilterName}" ${checked}>
        <label class="trip-filters__filter-label" for="filter-${lowerCaseFilterName}">${filter}</label>
        </div>`;
  });

  return template;
};

const createFiltersTemplate = (currentFilterType) => (`
    <form class="trip-filters" action="#" method="get">
      ${createFilterElements(currentFilterType)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
);

export { createFiltersTemplate };
