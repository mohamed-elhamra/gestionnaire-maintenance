import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAnomalyBtnCellRendrerComponent } from './close-anomaly-btn-cell-rendrer.component';

describe('CloseAnomalyBtnCellRendrerComponent', () => {
  let component: CloseAnomalyBtnCellRendrerComponent;
  let fixture: ComponentFixture<CloseAnomalyBtnCellRendrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseAnomalyBtnCellRendrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAnomalyBtnCellRendrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
