import {
  Component,
  input,
  InputSignal,
  model,
  computed,
  ModelSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from '../counter/counter.component';
import { Applets, Lib } from '../domain';
import { AppletsComponent } from '../applets/applets.component';

@Component({
  selector: 'categories',
  templateUrl: 'categories.template.html',
  standalone: true,
  imports: [FormsModule, CommonModule, CounterComponent, AppletsComponent],
})
export class CategoriesComponent {
  lib: InputSignal<Lib> = input.required<Lib>();
  search: ModelSignal<string> = model<string>('');
  selected: ModelSignal<number> = model<number>(0);

  selectedName = computed(() => this.lib().categories[this.selected()]);
  searchResults = computed(() => {
    if (this.search() !== '') {
      const applet = this.lib().applets.find(
        (item: Applets) => item.name === this.search()
      );
      return applet === undefined ? [] : applet.categories;
    } else {
      return this.lib().categories;
    }
  });

  select(idx: number): void {
    this.selected.set(idx);
  }
}
