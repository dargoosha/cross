import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonRange, IonButton, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IProduct } from '../classes/Iproduct';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Antivirus } from '../classes/antivirus';
import { Driver } from '../classes/driver';
import { OfficeSuite } from '../classes/office_suite';
import { OperatingSystem } from '../classes/operating_system';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonRange,
    IonButton,
    CommonModule,
    FormsModule
  ],
  standalone: true
})
export class ReviewComponent implements OnInit {
  @Input() products: IProduct[] = [];

  // Filter subjects
  private selectedTypesSubject = new BehaviorSubject<string[]>([]);
  private priceRangeSubject = new BehaviorSubject<{ min: number; max: number }>({ min: 0, max: Infinity });

  // Observable for filtered products
  filteredProducts$ = combineLatest([
    this.selectedTypesSubject,
    this.priceRangeSubject
  ]).pipe(
    map(([selectedTypes, priceRange]) => {
      return this.products.filter(product => {
        // Type filtering
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(this.getProductType(product));
        
        // Price filtering
        const priceMatch = product.getPrice() >= priceRange.min && product.getPrice() <= priceRange.max;

        return typeMatch && priceMatch;
      });
    })
  );

  // Available product types
  productTypes = [
    { value: 'os', label: 'Operating System' },
    { value: 'antivirus', label: 'Antivirus' },
    { value: 'office', label: 'Office Suite' },
    { value: 'driver', label: 'Driver' }
  ];

  // Price range bounds
  priceBounds = { min: 0, max: 1000 };

  constructor() {}

  ngOnInit() {
    // Initialize price bounds based on products
    if (this.products.length > 0) {
      const prices = this.products.map(p => p.getPrice());
      this.priceBounds = {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices))
      };
      this.priceRangeSubject.next(this.priceBounds);
    }
  }

  // Update selected types
  onTypeChange(event: any) {
    this.selectedTypesSubject.next(event.detail.value);
  }

  // Update price range
  onPriceRangeChange(event: any) {
    this.priceRangeSubject.next({
      min: event.detail.value.lower,
      max: event.detail.value.upper
    });
  }

  // Reset filters
  resetFilters() {
    this.selectedTypesSubject.next([]);
    this.priceRangeSubject.next(this.priceBounds);
  }

  // Helper method to determine product type
  private getProductType(product: IProduct): string {
    if (product instanceof OperatingSystem) return 'os';
    if (product instanceof Antivirus) return 'antivirus';
    if (product instanceof OfficeSuite) return 'office';
    if (product instanceof Driver) return 'driver';
    return '';
  }
}