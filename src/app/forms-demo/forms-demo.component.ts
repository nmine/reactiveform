import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButton} from 'primeng/radiobutton';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    RadioButton
  ],
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.css']
})
export class FormsDemoComponent implements OnInit {
  investmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.investmentForm = this.fb.group({
      montantInvesti: [1000, [Validators.required, Validators.max(1380)]],
      age: [35, [Validators.required, Validators.min(18), Validators.max(99)]],
      regimeSpecial: [false],
      branche: [21, Validators.required],
      capitalPension : 0,
    });
  }

  ngOnInit(): void {
  }

  get avantageFiscal(): number {
    const montant = this.investmentForm.get('montantInvesti')?.value || 0;
    const age = this.investmentForm.get('age')?.value || 0;
    if(age === 0 || age < 18 || age > 99) {
      return 0;
    }
    return Math.max(montant * 12 * 0.3 * 65 - age, 0);
  }

  get rendement(): number {
    const montant = this.investmentForm.get('montantInvesti')?.value || 0;
    return montant < 1050 ? 0.3 : 0.25;
  }

  get capitalFinal65(): number {
    const montant = this.investmentForm.get('montantInvesti')?.value || 0;
    const age = this.investmentForm.get('age')?.value || 0;

    if (age < 18 || age >= 65) {
      return 0;
    }

    const tauxRendement = 0.05;
    const dureeTotale = 65 - age;

    const dureeAvantTaxe = Math.min(60 - age, dureeTotale);
    const capitalAvantTaxe = montant * ((Math.pow(1 + tauxRendement, dureeAvantTaxe) - 1) / tauxRendement);

    const capitalApresTaxe = capitalAvantTaxe * 0.92;

    const dureeApresTaxe = dureeTotale - dureeAvantTaxe;
    const capitalCroit = capitalApresTaxe * Math.pow(1 + tauxRendement, dureeApresTaxe);

    const versementsApresTaxe = montant * ((Math.pow(1 + tauxRendement, dureeApresTaxe) - 1) / tauxRendement);

    const totalFinal = capitalCroit + versementsApresTaxe;
    return Math.round(totalFinal);
  }
  onSubmit() {
    console.log(this.investmentForm.value);
    console.log('Avantage fiscal calculé :', this.avantageFiscal);
  }
}
