import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsFactoryService } from 'src/app/services/forms-factory.service';

@Component({
  selector: 'app-offsuite-form',
  templateUrl: './offsuite-form.component.html',
  styleUrls: ['./offsuite-form.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OffsuiteFormComponent implements OnInit {
  officeSuiteForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() set ngValue(product: any) {
    if (product) {
      this.officeSuiteForm.patchValue(product);
    }
  }

  constructor(private formsFactory: FormsFactoryService) {
    this.officeSuiteForm = this.formsFactory.createProductForm('office');
  }

  ngOnInit() {}

  onSubmit() {
    if (this.officeSuiteForm.valid) {
      this.submitForm.emit(this.officeSuiteForm.value);
      this.officeSuiteForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}