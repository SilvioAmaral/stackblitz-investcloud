import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { CategoriesComponent } from './categories/categories.component';
import { AppletsComponent } from './applets/applets.component';
import { Lib } from './domain';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
<div class="container">
  <div class="row">
    <h1>Libraries</h1>
   </div> 
  <div class="row">
    <categories [lib]="lib"></categories> 
  </div>
</div>
  `,
  imports: [
    CategoriesComponent,
    CommonModule,
    AppletsComponent,
    CounterComponent,
  ],
})
export class App implements OnInit {
  // pretend you got data from server
  lib: Lib = {
    categories: ['Performance', 'Investments', 'Operations'],
    applets: [
      {
        name: 'Performance Snapshot',
        categories: ['Performance'],
      },
      {
        name: 'Commitment Widget',
        categories: ['Investments'],
      },
      {
        name: 'CMS',
        categories: ['Investments', 'Performance'],
      },
    ],
  };

  addBigData(lib: Lib, ncategs: number, napplets: number) {
    for (var i = 0; i < ncategs; i++) {
      lib.categories.push('Sample Category ' + i);
    }

    var n = lib.categories.length;
    for (var i = 0; i < napplets; i++) {
      var a = {
        name: 'CMS' + i,
        categories: [] as string[],
      };
      for (var j = 0; j < Math.floor(Math.random() * 10); ++j) {
        var idx = Math.floor(Math.random() * n) % n;
        a.categories.push(lib.categories[idx]);
      }
      lib.applets.push(a);
    }
  }

  ngOnInit(): void {
    this.addBigData(this.lib, 100, 5000);
  }
}

bootstrapApplication(App);
