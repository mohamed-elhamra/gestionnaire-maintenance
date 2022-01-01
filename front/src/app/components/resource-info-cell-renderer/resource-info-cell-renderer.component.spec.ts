import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceInfoCellRendererComponent } from './resource-info-cell-renderer.component';

describe('ResourceInfoCellRendererComponent', () => {
  let component: ResourceInfoCellRendererComponent;
  let fixture: ComponentFixture<ResourceInfoCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceInfoCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInfoCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
