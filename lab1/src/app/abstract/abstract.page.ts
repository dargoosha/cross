import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { MusicalInstrument } from '../classes/musical_instrument';
import { InstrumentFactory } from '../classes/instrument_factory';

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.page.html',
  styleUrls: ['./abstract.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonList, IonItem, IonLabel]
})

export class AbstractPage implements OnInit {
  instruments: MusicalInstrument[] = [];
  maxNoteRange: number = 0;

  constructor() {}

  ngOnInit() {
    fetch('https://api.jsonbin.io/v3/b/67cf38728a456b79667357f6/latest', {
      headers: {
        'X-Master-Key': '$2a$10$FONQ3CRy4LKnYn3eqLJOvOxtDwoStWgJcN0joZJsFwlPS8LW/oLvG'
      }
    })
    .then(response => response.json())
    .then(data => {
      this.instruments = data.record.map((instr: { type: string; name: string; noteRange: number; optional: number | boolean; }) => 
        InstrumentFactory.getInstrument(instr.type, instr.name, instr.noteRange, instr.optional)
      );
      this.maxNoteRange = Math.max(...this.instruments.map(i => i.noteRange));
    })
    .catch(error => console.error('Помилка отримання даних:', error));
  }
}