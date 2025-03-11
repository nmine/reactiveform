import { Routes } from '@angular/router';
import {FormsDemoComponent} from './forms-demo/forms-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'forms', pathMatch: 'full' }, // Redirige la page principale vers /forms
  { path: 'forms', component: FormsDemoComponent } // Route vers le formulaire
];
