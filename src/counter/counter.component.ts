import {
  Component,
  input,
  InputSignal,
  model,
  computed,
  ModelSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Applets } from '../domain';

@Component({
  selector: 'counter',
  template: `
    <span class="rounded-circle p-1" 
        [ngClass]="{ 'bg-white': selectedName() === category(),  'bg-dark-subtle': selectedName() !== category() }"> 
        {{count()}} 
    </span>`,
  styles: ``,
  standalone: true,
  imports: [CommonModule],
})
export class CounterComponent {
  applets: InputSignal<Applets[]> = input.required<Applets[]>(); // the applets to count categories
  category: InputSignal<string> = input.required<string>(); // category selected
  search: InputSignal<string> = input.required<string>(); // the search term
  selectedName: InputSignal<string> = input.required<string>(); // if this is selected or not

  count = computed(() => {
    if (this.search() !== '') {
      const result = this.applets().filter(
        (item: Applets) => item.name === this.search()
      );
      return result.length;
    } else {
      const result = this.applets().filter(
        (item: Applets) => item.categories.indexOf(this.category()) !== -1
      );
      return result.length;
    }
  });
}
