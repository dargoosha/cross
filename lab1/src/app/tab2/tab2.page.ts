import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, HeaderComponent, CommonModule]
})
export class Tab2Page {
  a: number | null = null;
  b: number | null = null;
  multiples44: number[] = [];
  specialNumbers: number[] = [];
  count: number | null = null;

  calculate() {
    if (this.a === null || this.b === null) {
      return;
    }
    const start = Math.min(this.a, this.b);
    const end = Math.max(this.a, this.b);
    this.multiples44 = [];
    this.specialNumbers = [];

    for (let i = start; i <= end; i++) {
      if (i % 44 === 0) {
        this.multiples44.push(i);
      }
      if (i % 5 === 3 && i % 2 !== 0) {
        this.specialNumbers.push(i);
      }
    }
    this.count = this.multiples44.length + this.specialNumbers.length;
  }
}
