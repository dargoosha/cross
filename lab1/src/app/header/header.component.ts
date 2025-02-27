import { Component, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonMenuButton,  IonButtons],
  standalone: true,
})
export class HeaderComponent  implements OnInit {

  @Input() name: string = 'Лабораторні роботи';
  constructor() { }

  ngOnInit() {}

}
