import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../classes/Iproduct';

@Pipe({
  name: 'version',
  standalone: true
})
export class VersionPipe implements PipeTransform {
  transform(description: string): string {
    const version = 'Остання версія: 1.0.3'; // або отримуй динамічно, якщо потрібно
    return `${description} (${version})`;
  }
}
