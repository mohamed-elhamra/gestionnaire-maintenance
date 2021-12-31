import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCellRendrerComponent } from './text-cell-rendrer.component';

describe('TextCellRendrerComponent', () => {
  let component: TextCellRendrerComponent;
  let fixture: ComponentFixture<TextCellRendrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextCellRendrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCellRendrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
