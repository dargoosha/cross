import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsFactoryService } from 'src/app/services/forms-factory.service';

@Component({
  selector: 'app-antivirus-form',
  templateUrl: './antivirus-form.component.html',
  styleUrls: ['./antivirus-form.component.scss'],
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
export class AntivirusFormComponent implements OnInit {
  antivirusForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() set ngValue(product: any) {
    if (product) {
      this.antivirusForm.patchValue(product);
    }
  }

  constructor(private formsFactory: FormsFactoryService) {
    this.antivirusForm = this.formsFactory.createProductForm('antivirus');
  }

  ngOnInit() {}

  onSubmit() {
    if (this.antivirusForm.valid) {
      this.submitForm.emit(this.antivirusForm.value);
      this.antivirusForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}