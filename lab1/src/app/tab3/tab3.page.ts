import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, HeaderComponent, CommonModule]
})
export class Tab3Page {
  n: number = 0;
  matrix: number[][] = [];
  highlightedNumbers: Set<number> = new Set();

  generateMatrix() {
    if (!this.n || this.n <= 0) {
      return;
    }
    this.matrix = Array.from({ length: this.n }, () =>
      Array.from({ length: this.n }, () => Math.floor(Math.random() * 21) - 10)
    );
    this.highlightMatchingElements();
  }

  highlightMatchingElements() {
    const countMap = new Map<number, number>();
    
    this.matrix.reduce((acc, row) => acc.concat(row), []).forEach((num: number) => {
      const absNum = Math.abs(num);
      countMap.set(absNum, (countMap.get(absNum) || 0) + 1);
    });

    this.highlightedNumbers = new Set(
      [...countMap.entries()].filter(([_, count]) => count % 2 === 0).map(([num]) => num)
    );
  }
  getAbsoluteValue(num: number): number {
    return Math.abs(num);
  }
}
