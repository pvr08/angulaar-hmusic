import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemGridComponent } from './card-item-grid.component';

describe('CardItemGridComponent', () => {
  let component: CardItemGridComponent;
  let fixture: ComponentFixture<CardItemGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardItemGridComponent]
    });
    fixture = TestBed.createComponent(CardItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
