import Observable from '../framework/observable.js';

import { Sorts } from '../const.js';

export default class SortModel extends Observable {
  #sort = Sorts.DAY;

  get = () => this.#sort;

  set = (updateType, update) => {
    this.#sort = update;
    this._notify(updateType, update);
  };
}
