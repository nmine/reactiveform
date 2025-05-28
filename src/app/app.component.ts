import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="bg-gray-100 min-h-screen">
      <nav class="bg-white shadow-md p-4 mb-6">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold text-blue-700">{{ title }}</h1>
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
  title = 'Berafin';
}
