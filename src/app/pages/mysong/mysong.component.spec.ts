import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysongComponent } from './mysong.component';

describe('MysongComponent', () => {
  let component: MysongComponent;
  let fixture: ComponentFixture<MysongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MysongComponent]
    });
    fixture = TestBed.createComponent(MysongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
