import { Routes } from '@angular/router';
import { ResutadosComponent } from './components/resutados/resutados.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

export const routes: Routes = [
  { path: '', component: SearchFormComponent },
  { path: 'ruta/:estacionOrigen/:estacionDesino', component: ResutadosComponent },
];

