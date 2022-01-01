import { AnomalyService } from 'src/app/services/anomaly.service';
import { Anomaly } from './../../models/anomaly.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-close-anomaly-btn-cell-rendrer',
  templateUrl: './close-anomaly-btn-cell-rendrer.component.html',
  styleUrls: ['./close-anomaly-btn-cell-rendrer.component.css']
})
export class CloseAnomalyBtnCellRendrerComponent implements OnInit, ICellRendererAngularComp {

  //confirm modal
  modalRef?: BsModalRef;

  anomaly: Anomaly = new Anomaly();
  
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  constructor(
    private modalService: BsModalService,
    private anomalyService: AnomalyService,
    private toaster: ToastrService
  ){

  }

  private params: any;

  agInit(params: any): void {
    this.params = params;
    this.anomaly = this.params.data;
  }

  btnClickedHandler(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.anomalyService.closeAnomaly(this.anomaly.title).subscribe({
      next: res => {
        this.toaster.success('Anomaly closed successfully', 'Gestionnaire maintenance');
      },
      error: err => {
        this.toaster.error(err.error.message, 'Gestionnaire maintenance');
      }
    })

    this.params.clicked(this.params);
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
