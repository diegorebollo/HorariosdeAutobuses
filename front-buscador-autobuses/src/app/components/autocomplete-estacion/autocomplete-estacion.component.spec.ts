import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteEstacionComponent } from './autocomplete-estacion.component';

describe('AutocompleteEstacionComponent', () => {
  let component: AutocompleteEstacionComponent;
  let fixture: ComponentFixture<AutocompleteEstacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteEstacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutocompleteEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
