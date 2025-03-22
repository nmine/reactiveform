import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {Slider} from 'primeng/slider';
import {DatePicker} from 'primeng/datepicker';
@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, Slider,DatePicker],
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.css']
})
export class FormsDemoComponent implements OnInit {
  // Reactive form
  myForm: FormGroup;
  simpleForm = new FormControl('');

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
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
  updateSimpleForm() {
    this.simpleForm.setValue('Nancy');
  }

}
