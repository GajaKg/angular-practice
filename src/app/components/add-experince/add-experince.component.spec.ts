import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperinceComponent } from './add-experince.component';

describe('AddExperinceComponent', () => {
  let component: AddExperinceComponent;
  let fixture: ComponentFixture<AddExperinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExperinceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExperinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
