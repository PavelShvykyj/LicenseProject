import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWokerRolesComponent } from './co-woker-roles.component';

describe('CoWokerRolesComponent', () => {
  let component: CoWokerRolesComponent;
  let fixture: ComponentFixture<CoWokerRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWokerRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWokerRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
