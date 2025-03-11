import {Component} from '@angular/core';
import {FormsDemoComponent} from './forms-demo/forms-demo.component';

@Component({
  selector: 'app-root',
  imports: [FormsDemoComponent],
  template: `
    <h1>Bienvenue sur l'application de test des formulaires Angular</h1>
    <app-forms-demo></app-forms-demo>
  `,
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-demo';
}
