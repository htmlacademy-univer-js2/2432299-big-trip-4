import Observable from '../framework/observable';

import { updateItem } from '../utils/utils';

export default class PointsModel extends Observable {
  #service = null;
  #points = [];

  constructor(service) {
    super();

    this.#service = service;
    this.#points = this.#service.points;
  }

  get = () => this.#points;

  update = (updateType, point) => {
    const updatedPoint = this.#service.updatePoint(point);
    this.#points = updateItem(this.#points, updatedPoint);
    this._notify(updateType, updatedPoint);
  };

  add = (updateType, point) => {
    const addedPoint = this.#service.addPoint(point);
    this.#points.push(addedPoint);
    this._notify(updateType, addedPoint);
  };

  delete = (updateType, point) => {
    this.#service.delete(point);
    this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
    this._notify(updateType);
  };
}
