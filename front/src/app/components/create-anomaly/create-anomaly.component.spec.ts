import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnomalyComponent } from './create-anomaly';

describe('CreateAnomalyComponent', () => {
  let component: CreateAnomalyComponent;
  let fixture: ComponentFixture<CreateAnomalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnomalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnomalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
