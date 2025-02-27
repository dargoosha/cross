import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { IonContent } from '@ionic/angular/standalone';
import { Chart } from 'chart.js/auto';
import { Group } from '../classes/group';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.page.html',
  styleUrls: ['./cloud.page.scss'],
  imports: [CommonModule, IonContent, HeaderComponent],
  standalone: true,
})
export class CloudPage implements OnInit, AfterViewInit {
  @ViewChild('courseChart', { static: false }) courseChart!: ElementRef;
  groups: Group[] = [];
  groupedGroups: { [key: string]: Group[] } = {};
  linechart: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchGroups();
  }

  ngAfterViewInit(): void {
    // Викликаємо courseChartMethod() після завантаження DOM
    this.cdr.detectChanges();
    this.courseChartMethod();
  }

  getCourses(): string[] {
    return Object.keys(this.groupedGroups);
  }

  fetchGroups(): void {
    fetch('https://api.jsonbin.io/v3/b/67c01f7be41b4d34e49dafb4/latest', {
      method: 'GET',
      headers: { 'X-Master-Key': '$2a$10$FONQ3CRy4LKnYn3eqLJOvOxtDwoStWgJcN0joZJsFwlPS8LW/oLvG' }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.record)) {
          this.groups = data.record;
        } else {
          console.error('Невірна структура даних', data);
          return;
        }

        this.groupedGroups = this.groupByCourse(this.groups);
        this.cdr.detectChanges(); 
        this.courseChartMethod(); 
      })
      .catch(error => console.error('Помилка завантаження даних:', error));
  }

  groupByCourse(groups: Group[]): { [key: string]: Group[] } {
    return groups.reduce((acc, group) => {
      if (!acc[group.course]) {
        acc[group.course] = [];
      }
      acc[group.course].push(group);
      return acc;
    }, {} as { [key: string]: Group[] });
  }

  courseChartMethod(): void {
    if (this.courseChart?.nativeElement && this.groups.length > 0) {
      if (this.linechart) {
        this.linechart.destroy(); 
      }
      this.linechart = new Chart(this.courseChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.groups.map(g => g.name),
          datasets: [{
            label: 'Кількість студентів',
            data: this.groups.map(g => g.students_count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
      });
    }
  }
}
