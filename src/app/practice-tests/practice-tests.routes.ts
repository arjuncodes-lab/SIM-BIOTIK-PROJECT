import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Todo } from './todo/todo';
import { Weather } from './weather/weather';
import { MapRouting } from './map-routing/map-routing';

export const PRACTICE_TESTS_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'todo', pathMatch: 'full' },
      { path: 'todo', component: Todo },
      { path: 'weather', component: Weather },
      { path: 'map-routing', component: MapRouting }
    ]
  }
];
