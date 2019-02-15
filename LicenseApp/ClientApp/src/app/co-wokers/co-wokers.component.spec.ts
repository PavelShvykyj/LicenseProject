import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWokersComponent } from './co-wokers.component';

describe('CoWokersComponent', () => {
  let component: CoWokersComponent;
  let fixture: ComponentFixture<CoWokersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWokersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
