import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'cloud',
    loadComponent: () => import('./cloud/cloud.page').then( m => m.CloudPage)
  },
  {
    path: 'abstract',
    loadComponent: () => import('./abstract/abstract.page').then( m => m.AbstractPage)
  },
  {
    path: 'servicepage',
    loadComponent: () => import('./servicepage/servicepage.page').then( m => m.ServicepagePage)
  },
];
