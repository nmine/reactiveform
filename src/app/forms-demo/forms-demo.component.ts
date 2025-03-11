import {Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  reactiveForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.reactiveForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      career: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.reactiveForm.valueChanges.subscribe(value => console.log("form changed"));
  }

  submitReactiveForm() {
    console.log('Reactive Form Data:', this.reactiveForm.value);
  }
}
