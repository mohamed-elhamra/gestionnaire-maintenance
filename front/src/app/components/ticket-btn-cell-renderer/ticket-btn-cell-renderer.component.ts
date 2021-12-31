import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-ticket-btn-cell-renderer',
  templateUrl: './ticket-btn-cell-renderer.component.html',
  styleUrls: ['./ticket-btn-cell-renderer.component.css']
})
export class TicketBtnCellRendererComponent implements OnInit, ICellRendererAngularComp  {

  constructor(
    private router: Router
  ) { }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  private params: any;
  private publicId: string = '';

  agInit(params: any): void {
    this.params = params;
    this.publicId = this.params.data.publicId;
  }

  ngOnInit(): void {
  }

  redirect(){
    this.router.navigateByUrl(`/resources/${this.publicId}/ticket`);
  }

}
