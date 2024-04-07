import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResutadosComponent } from './resutados.component';

describe('ResutadosComponent', () => {
  let component: ResutadosComponent;
  let fixture: ComponentFixture<ResutadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResutadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResutadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
