import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBtnCellRendererComponent } from './ticket-btn-cell-renderer.component';

describe('TicketBtnCellRendererComponent', () => {
  let component: TicketBtnCellRendererComponent;
  let fixture: ComponentFixture<TicketBtnCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketBtnCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBtnCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
