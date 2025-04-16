import { Injectable } from '@angular/core';
import { Antivirus } from '../classes/antivirus';
import { OfficeSuite } from '../classes/office_suite';
import { OperatingSystem } from '../classes/operating_system';
import { IProduct } from '../classes/Iproduct';
import { Driver } from '../classes/driver';

@Injectable({
  providedIn: 'root'
})
export class SoftwareFactoryService {

  constructor() { }
  
  createProduct(type: string, data: any): IProduct {
    switch (type) {
      case 'os':
        return new OperatingSystem(
          data.id,
          data.name,
          data.price,
          data.description,
          data.version,
          data.supportedArchitectures
        );
      case 'antivirus':
        return new Antivirus(
          data.id,
          data.name,
          data.price,
          data.description,
          data.protectionLevel,
          data.supportedDevices
        );
      case 'office':
        return new OfficeSuite(
          data.id,
          data.name,
          data.price,
          data.description,
          data.includedApps,
          data.isSubscription
        );
      case 'driver':
        return new Driver(
          data.id,
          data.name,
          data.price,
          data.description,
          data.hardwareType,
          data.version
      );
      default:
        throw new Error('Unknown product type');
    }
  }
}