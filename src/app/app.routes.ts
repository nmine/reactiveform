import { Routes } from '@angular/router';
import { ProduitEpargneComponent } from './epargne-pension/produit-epargne.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'forms', pathMatch: 'full' }, // Redirige la page principale vers /forms
  { path: '', component: ProduitEpargneComponent } // Route vers le simulateur d'épargne
];
