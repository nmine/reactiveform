import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';
import {RadioButton} from 'primeng/radiobutton';

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
    { id: 'pension', name: 'Epargne pension', icon: '💰' },
    { id: 'long_terme', name: 'Epargne long terme', icon: '🏛️' },
    { id: 'pcls', name: 'PCLS', icon: '📊' }
  ];

  // Dropdown options for sectors
  branches = [
    { label: '21', value: '21' },
    { label: '23', value: '23' }
  ];

  // Calculate summary data
  avantageFiscal: number = 0;
  capitalEstime: number = 0;

  constructor(private fb: FormBuilder) { }

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

    // Reset all validators
    for (const produit of this.produits) {
      const produitGroup = produitDetails.get(produit.id) as FormGroup;
      if (produitGroup) {
        Object.keys(produitGroup.controls).forEach(key => {
          produitGroup.get(key)?.clearValidators();
          produitGroup.get(key)?.updateValueAndValidity();
        });
      }
    }

    // Set validators for selected products
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

  // Toggle product selection
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

  // Check if a product is selected
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
          this.avantageFiscal += details.montantInvesti * 12 * this.getRendement(details.montantInvesti) * 65 - details.age; // 30% tax advantage
          this.capitalEstime += details.montantInvesti * Math.pow(1.04, 65 - details.age); // 4% annual return until 65
          break;

        case 'long_terme':
          this.avantageFiscal += details.montantInvesti * 0.2; // 20% tax advantage
          // Initial investment + monthly payments with interest
          const monthlyRate = details.tauxInteret / 100 / 12;
          const months = details.duree * 12;
          this.capitalEstime += details.montantInvesti * Math.pow(1 + monthlyRate, months);
          this.capitalEstime += details.versementMensuel * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
          break;

        case 'pcls':
          // No tax advantage for PCLS
          this.capitalEstime += details.montantActuel * Math.pow(1.035, details.anneeAvantRetraite);
          this.capitalEstime *= details.pourcentageRetraite / 100; // Apply retirement percentage
          break;
      }
    }

    // Round to 2 decimal places
    this.avantageFiscal = Math.round(this.avantageFiscal);
    this.capitalEstime = Math.round(this.capitalEstime);
  }

  private getRendement(montantInvesti : number): number {
    return montantInvesti < 1050 ? 0.3 : 0.25;
  }
}
