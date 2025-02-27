export class Group {
    name: string;
    course: number;
    leader: string;
    students_count: number;
  
    constructor(name: string, course: number, leader: string, students_count: number) {
      this.name = name;
      this.course = course;
      this.leader = leader;
      this.students_count = students_count;
    }
  
    getInfo(): string {
      return `Група: ${this.name}, Курс: ${this.course}, Староста: ${this.leader}, Кількість студентів: ${this.students_count}`;
    }
  }