import { Injectable, Optional } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class Service3Service {

  constructor(@Optional() private logService: LogService) { }

  computeExpRecursive(x: number, terms: number = 10, n: number = 0, sum: number = 0): number {
    if (n >= terms) return sum;
    sum += (Math.pow(-1, n) * Math.pow(x, 2 * n)) / this.factorial(n);
    
    if (this.logService) {
      this.logService.write(`Recursion: x=${x}, term=${n}, sum=${sum}`);
    }
    
    return this.computeExpRecursive(x, terms, n + 1, sum);
  }

  private factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    return n * this.factorial(n - 1);
  }
}