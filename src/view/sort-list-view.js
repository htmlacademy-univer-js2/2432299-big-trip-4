import AbstractView from '../framework/view/abstract-view.js';

import { createEventSortTemplate } from '../template/sort-list-template.js';

export default class EventSortView extends AbstractView {
  get template() {
    return createEventSortTemplate();
  }
}
