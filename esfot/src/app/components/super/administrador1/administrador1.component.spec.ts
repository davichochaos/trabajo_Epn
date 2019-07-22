import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Administrador1Component } from './administrador1.component';

describe('Administrador1Component', () => {
  let component: Administrador1Component;
  let fixture: ComponentFixture<Administrador1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Administrador1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Administrador1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
