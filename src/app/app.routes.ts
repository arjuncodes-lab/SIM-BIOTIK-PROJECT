import { Routes } from '@angular/router';
import { LoginComponent } from './components/login';
 
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'practice-tests',
    loadChildren: () =>
      import('./practice-tests/practice-tests.module')
        .then(m => m.PracticeTestsModule)
  },
];