import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="bg-gray-100 min-h-screen">
      <nav class="bg-white shadow-md p-4 mb-6">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold text-blue-700">{{ title }}</h1>
          <div class="flex gap-4">
            <a routerLink="/forms" routerLinkActive="text-blue-700 font-bold" class="text-gray-600 hover:text-blue-700">Formulaire Demo</a>
            <a routerLink="/produit-epargne" routerLinkActive="text-blue-700 font-bold" class="text-gray-600 hover:text-blue-700">Simulateur d'épargne</a>
          </div>
        </div>
      </nav>
      <div class="container mx-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Form Demo';
}
