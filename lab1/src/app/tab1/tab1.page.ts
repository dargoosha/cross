import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
//import { IonItem, IonContent, IonLabel, IonCard, IonInput, IonButton, IonCardTitle, IonCardHeader, IonCardContent, IonText } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ FormsModule, HeaderComponent, CommonModule, IonicModule],
})
export class Tab1Page {
  num1: number | null = null;
  num2: number | null = null;
  num3: number | null = null;
  result: number | null = null;

  calculate() {
    if (this.num1 === null || this.num2 === null || this.num3 === null) {
      return;
    }
    const sum = this.num1 + this.num2 + this.num3;
    if (this.num1 > 5 || this.num2 > 5 || this.num3 > 5) {
      this.result = Math.pow(sum, 3);
    } else {
      this.result = sum;
    }
  }
}
