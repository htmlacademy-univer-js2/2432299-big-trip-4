import AbstractRadioListView from './abstract-radio-list-view.js';

import { createFilterTemplate } from '../template/filter-template.js';

export default class FilterView extends AbstractRadioListView {
  get template() {
    return createFilterTemplate(this.items);
  }
}
