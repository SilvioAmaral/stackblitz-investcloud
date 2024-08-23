import {
  Component,
  input,
  InputSignal,
  model,
  computed,
  ModelSignal,
} from '@angular/core';
import { Applets } from '../domain';

@Component({
  selector: 'applets',
  templateUrl: 'applets.template.html',
  standalone: true,
})
export class AppletsComponent {
  applets: InputSignal<Applets[]> = input.required<Applets[]>();
  selected: InputSignal<string> = input.required<string>();
  search: InputSignal<string> = input.required<string>();

  selectedCategories = computed(() => {
    let entries: string[] = [];
    if (this.search() === '') {
      this.applets().forEach((item) => {
        if (item.categories.indexOf(this.selected()) !== -1) {
          entries.push(item.name);
        }
      });
    } else {
      this.applets().forEach((item) => {
        if (item.name === this.search()) {
          entries.push(item.name);
        }
      });
    }
    return entries;
  });
}
