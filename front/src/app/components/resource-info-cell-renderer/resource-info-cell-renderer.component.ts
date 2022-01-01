import { Resource } from './../../models/resource.model';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-resource-info-cell-renderer',
  templateUrl: './resource-info-cell-renderer.component.html',
  styleUrls: ['./resource-info-cell-renderer.component.css']
})
export class ResourceInfoCellRendererComponent implements OnInit, ICellRendererAngularComp {

  publicId: string = '';
  resource: Resource = new Resource();

  html = '';

  agInit(params: any): void {
    this.publicId = params.value;
  }

  constructor(
    private resourceService: ResourceService
  ) { }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.resourceService.getResourceByPublicId(this.publicId).subscribe({
      next: res => {
        this.resource = res;
        this.html = `<ul>
                      <li>${this.resource.name}</li>
                      <li>${this.resource.localisation}</li>
                    </ul>`;
      },
      error: err => { }
    });
  }

}
