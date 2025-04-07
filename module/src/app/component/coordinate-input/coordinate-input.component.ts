import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonLabel, IonButton, IonInput, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, IonItem, IonLabel, IonInput, ReactiveFormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent], 
})
export class CoordinateInputComponent {
  coordinateForm: FormGroup;

  @Output() coordinatesSubmitted = new EventEmitter<{
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
  }>();

  @Input() formattedDistance: string | null = null; 
  @Input() distance: number | null = null; 
  constructor(private fb: FormBuilder) {
    this.coordinateForm = this.fb.group({
      lat1: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      lon1: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      lat2: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      lon2: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
    });
  }

  onSubmit() {
    if (this.coordinateForm.valid) {
      const { lat1, lon1, lat2, lon2 } = this.coordinateForm.value;
      this.coordinatesSubmitted.emit({
        lat1: +lat1,
        lon1: +lon1,
        lat2: +lat2,
        lon2: +lon2,
      });
    }
  }
}