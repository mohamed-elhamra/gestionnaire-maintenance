import { ResourceService } from './../../services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css']
})
export class DeleteBtnComponent implements OnInit, ICellRendererAngularComp {

  //confirm modal
  modalRef?: BsModalRef;
  
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private resourceService: ResourceService,
    private toaster: ToastrService
  ){

  }

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    if(this.params.data.username){
      this.userService.deleteMaintenanceManager(this.params.data.username).subscribe({
        next: res => {
          this.toaster.success('User deleted successfully', 'Gestionnaire maintenance');
        },
        error: err => {
          this.toaster.error('Something went wrong !', 'Gestionnaire maintenance');
        }
      });
    }else if(this.params.data.publicId){
      this.resourceService.deleteResource(this.params.data.publicId).subscribe({
        next: res => {
          this.toaster.success('Resource deleted successfully', 'Gestionnaire maintenance');
        },
        error: err => {
          this.toaster.error('Something went wrong !', 'Gestionnaire maintenance');
        }
      });
    }

    this.params.clicked(this.params);
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
