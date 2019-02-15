import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWokerComponent } from './co-woker.component';

describe('CoWokerComponent', () => {
  let component: CoWokerComponent;
  let fixture: ComponentFixture<CoWokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
