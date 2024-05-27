import Observable from '../framework/observable';

import { Filters } from '../const.js';

export default class FilterModel extends Observable {
  #filter = Filters.EVERYTHING;

  get = () => this.#filter;

  set = (updateType, update) => {
    this.#filter = update;
    this._notify(updateType, update);
  };
}
