import {Component, OnInit} from '@angular/core';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.css']
})
export class FormsDemoComponent implements OnInit {
  // Reactive form
  myForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    const phone = this.formBuilder.group({
      area: [],
      prefix: [],
      line: [],
    })

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phones: this.formBuilder.array([])
    });
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  addPhone(){
    const phone = this.formBuilder.group({
      area: [],
      prefix: [],
      line: [],
    })
    this.phoneForms.push(phone);
  }

  deletePhone(i: number) {
    this.phoneForms.removeAt(i);
  }


  ngOnInit() {
    this.myForm.valueChanges.subscribe(value => console.log("form changed"));
  }

  submitReactiveForm() {
    console.log('Reactive Form Data:', this.myForm.value);
  }
}
