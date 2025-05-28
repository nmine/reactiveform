import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

// PrimeNG Components
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {SliderModule} from 'primeng/slider';
import {AccordionModule} from 'primeng/accordion';
import {RadioButton} from 'primeng/radiobutton';
import {SimulateEpargnePensionQuery} from './application/use-cases/simulateEpargnePensionQuery';
import {SimulateEpargnePensionUseCase} from './application/use-cases/simulate-epargne-pension-use.case';

@Component({
  selector: 'app-produit-epargne',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    SliderModule,
    AccordionModule,
    RadioButton
  ],
  templateUrl: './produit-epargne.component.html',
  styleUrls: ['./produit-epargne.component.css']
})
export class ProduitEpargneComponent implements OnInit {
  // Form groups
  formGroup!: FormGroup;

  // Product types
  produits = [
    {id: 'pension', name: 'Epargne pension', icon: '💰'},
    {id: 'long_terme', name: 'Epargne long terme', icon: '🏛️'},
    {id: 'pcls', name: 'PCLS', icon: '📊'}
  ];

  // Dropdown options for sectors
  branches = [
    {label: '21', value: '21'},
    {label: '23', value: '23'}
  ];

  // Calculate summary data
  avantageFiscal: number = 0;
  capitalEstime: number = 0;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      selectedProduits: [[]],
      produitDetails: this.fb.group({
        pension: this.fb.group({
          montantInvesti: [5000, [Validators.required, Validators.min(0)]],
          age: [30, [Validators.required, Validators.min(18), Validators.max(65)]],
          pensionBranche: ['finance', Validators.required],
          regimeSpecial: [false]
        }),
        long_terme: this.fb.group({
          montantInvesti: [5000, [Validators.required, Validators.min(0)]],
          age: [30, [Validators.required, Validators.min(18), Validators.max(65)]],
          longTermeBranche: ['finance', Validators.required],
          regimeSpecial: [false]
        }),
        pcls: this.fb.group({
          montantInvesti: [5000, [Validators.required, Validators.min(0)]],
          age: [30, [Validators.required, Validators.min(18), Validators.max(65)]],
          pclsBranche: ['finance', Validators.required],
          regimeSpecial: [false]
        })
      })
    });

    // When selected products change, update validations
    this.formGroup.get('selectedProduits')?.valueChanges.subscribe(selectedProds => {
      this.updateValidators(selectedProds);
      this.calculateSummary();
    });

    // Recalculate summary when any value changes
    this.formGroup.valueChanges.subscribe(() => {
      this.calculateSummary();
    });
  }

  updateValidators(selectedProducts: string[]): void {
    const produitDetails = this.formGroup.get('produitDetails') as FormGroup;

    for (const produit of this.produits) {
      const produitGroup = produitDetails.get(produit.id) as FormGroup;
      if (produitGroup) {
        Object.keys(produitGroup.controls).forEach(key => {
          produitGroup.get(key)?.clearValidators();
          produitGroup.get(key)?.updateValueAndValidity();
        });
      }
    }

    for (const produitId of selectedProducts) {
      const produitGroup = produitDetails.get(produitId) as FormGroup;
      if (produitGroup) {
        Object.keys(produitGroup.controls).forEach(key => {
          produitGroup.get(key)?.setValidators(
            key === 'regimeSpecial' ? null : [Validators.required]
          );
          produitGroup.get(key)?.updateValueAndValidity();
        });
      }
    }
  }

  toggleProduit(produitId: string): void {
    const currentSelection = [...this.formGroup.get('selectedProduits')?.value || []];
    const index = currentSelection.indexOf(produitId);

    if (index > -1) {
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(produitId);
    }

    this.formGroup.get('selectedProduits')?.setValue(currentSelection);
  }

  isProduitSelected(produitId: string): boolean {
    return (this.formGroup.get('selectedProduits')?.value || []).includes(produitId);
  }

  calculateSummary(): void {
    this.avantageFiscal = 0;
    this.capitalEstime = 0;

    const selectedProducts = this.formGroup.get('selectedProduits')?.value || [];
    const produitDetails = this.formGroup.get('produitDetails')?.value || {};

    for (const produitId of selectedProducts) {
      const details = produitDetails[produitId];
      if (!details) continue;

      switch (produitId) {
        case 'pension':
          const useCase = new SimulateEpargnePensionUseCase();
          const dto: SimulateEpargnePensionQuery = {
            age: details.age,
            primeMensuelle: details.montantInvesti,
            branch: details.branch,
            specialRegime: details.regimeSpecial
          };

          const result = useCase.execute(dto);

          this.avantageFiscal = result.avantageFiscal;
          this.capitalEstime = result.capitalFinal;
          break;

        case 'long_terme':

        case 'pcls':
      }
    }

// Round to 2 decimal places
    this.avantageFiscal = Math.round(this.avantageFiscal);
    this.capitalEstime = Math.round(this.capitalEstime);
  }

  private getRendement(montantInvesti: number): number {
    return montantInvesti < 1050 ? 0.3 : 0.25;
  }
}
