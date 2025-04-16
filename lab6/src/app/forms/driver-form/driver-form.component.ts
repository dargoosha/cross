import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsFactoryService } from 'src/app/services/forms-factory.service';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss'],
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
export class DriverFormComponent implements OnInit {
  driverForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() set ngValue(product: any) {
    if (product) {
      this.driverForm.patchValue(product);
    }
  }

  constructor(private formsFactory: FormsFactoryService) {
    this.driverForm = this.formsFactory.createProductForm('driver');
  }

  ngOnInit() {}

  onSubmit() {
    if (this.driverForm.valid) {
      this.submitForm.emit(this.driverForm.value);
      this.driverForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}