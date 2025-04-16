import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsFactoryService } from 'src/app/services/forms-factory.service';

@Component({
  selector: 'app-os-form',
  templateUrl: './os-form.component.html',
  styleUrls: ['./os-form.component.scss'],
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
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OsFormComponent implements OnInit {
  osForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() set ngValue(product: any) {
    if (product) {
      this.osForm.patchValue(product);
    }
  }

  constructor(private formsFactory: FormsFactoryService) {
    this.osForm = this.formsFactory.createProductForm('os');
  }

  ngOnInit() {}

  onSubmit() {
    if (this.osForm.valid) {
      this.submitForm.emit(this.osForm.value);
      this.osForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}