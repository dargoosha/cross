import { Injectable } from '@angular/core';
import { Antivirus } from '../classes/antivirus';
import { OfficeSuite } from '../classes/office_suite';
import { OperatingSystem } from '../classes/operating_system';
import { IProduct } from '../classes/Iproduct';
import { Driver } from '../classes/driver';
import { Other } from '../classes/other';

@Injectable({
  providedIn: 'root'
})
export class SoftwareFactoryService {

  constructor() { }
  
  createProduct(type: string, data: any): IProduct {
    switch (type) {
      case 'os':
        return new OperatingSystem(
          data.type,
          data.id,
          data.name,
          data.price,
          data.description,
          data.version,
          data.supportedArchitectures
        );
      case 'antivirus':
        return new Antivirus(
          data.type,
          data.id,
          data.name,
          data.price,
          data.description,
          data.protectionLevel,
          data.supportedDevices
        );
      case 'office':
        return new OfficeSuite(
          data.type,
          data.id,
          data.name,
          data.price,
          data.description,
          data.includedApps,
          data.isSubscription
        );
      case 'driver':
        return new Driver(
          data.type,
          data.id,
          data.name,
          data.price,
          data.description,
          data.hardwareType,
          data.version
      );
      default:
        return new Other(
          data.type,
          data.id,
          data.name,
          data.price,
          data.description
        );
    }
  }
}