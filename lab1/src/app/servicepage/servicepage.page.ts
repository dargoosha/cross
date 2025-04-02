import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";
import { Chart } from 'chart.js';
import { Service1Service } from '../services/service1.service';
import { Service2Service } from '../services/service2.service';
import { Service3Service } from '../services/service3.service';

@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.page.html',
  styleUrls: ['./servicepage.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class ServicepagePage implements OnInit {
  tableData: { x: number, service1: number, service2: number, service3: number }[] = [];

  constructor(
    private service1: Service1Service,
    private service2: Service2Service,
    private service3: Service3Service
  ) {}

  ngOnInit() {
    this.generateTableData();
    setTimeout(() => {
      this.createChart('chart1', this.tableData.map(d => d.x), this.tableData.map(d => d.service1), 'Service 1');
      this.createChart('chart2', this.tableData.map(d => d.x), this.tableData.map(d => d.service2), 'Service 2');
      this.createChart('chart3', this.tableData.map(d => d.x), this.tableData.map(d => d.service3), 'Service 3');
    }, 500);
  }

  generateTableData() {
    for (let x = -1; x <= 1; x += 0.1) {
      let service1Value = this.service1.tabulateFunction(x, x, 1)[0]?.y || 0;
      let service2Value = this.service2.computeExpSeries(x, 10);
      let service3Value = this.service3.computeExpRecursive(x, 10);
      this.tableData.push({ x: parseFloat(x.toFixed(1)), service1: service1Value, service2: service2Value, service3: service3Value });
    }
  }

  createChart(canvasId: string, xData: number[], yData: number[], label: string) {
    new Chart(canvasId, {
      type: 'line',
      data: {
        labels: xData.map(x => x.toString()),
        datasets: [{
          label: label,
          data: yData,
          borderColor: 'blue',
          backgroundColor: 'lightblue',
          fill: false,
          tension: 0.1
        }]
      },
    });
  }
}