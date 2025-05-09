import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsFactoryService } from 'src/app/services/forms-factory.service';

@Component({
  selector: 'app-other-form',
  templateUrl: './other-form.component.html',
  styleUrls: ['./other-form.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OtherFormComponent  implements OnInit {

  otherForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() set ngValue(product: any) {
    if (product) {
      this.otherForm.patchValue(product);
    }
  }

  constructor(private formsFactory: FormsFactoryService) {
    this.otherForm = this.formsFactory.createProductForm('other');
  }

  ngOnInit() {}

  onSubmit() {
    if (this.otherForm.valid) {
      this.submitForm.emit(this.otherForm.value);
      this.otherForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

}
