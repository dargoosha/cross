import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractPage } from './abstract.page';

describe('AbstractPage', () => {
  let component: AbstractPage;
  let fixture: ComponentFixture<AbstractPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
