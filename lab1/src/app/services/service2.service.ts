import { Injectable, Optional } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class Service2Service {

  constructor(@Optional() private logService: LogService) { }

  computeExpSeries(x: number, terms: number = 10): number {
    let sum = 0;
    for (let n = 0; n < terms; n++) {
      sum += (Math.pow(-1, n) * Math.pow(x, 2 * n)) / this.factorial(n);
    }

    if (this.logService) {
      this.logService.write(`Series: x=${x}, terms=${terms}, sum=${sum}`);
    }
    return sum;
  }

  private factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}
