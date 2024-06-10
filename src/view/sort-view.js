import AbstractRadioListView from './abstract-radio-list-view.js';

import { createSortTemplate } from '../template/sort-template.js';

export default class SortView extends AbstractRadioListView {
  get template() {
    return createSortTemplate(this.items);
  }
}
