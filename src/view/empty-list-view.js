import AbstractView from '../framework/view/abstract-view.js';

import { createEmptyListTemplate } from '../template/empty-list-template.js';

import { EmptyListMessage } from '../const.js';

export default class EmptyListView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createEmptyListTemplate(EmptyListMessage[this.#filter]);
  }
}
