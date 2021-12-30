import { ToastrService } from 'ngx-toastr';
import { Resource } from './../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent implements OnInit {


  //create resource
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private resourceService: ResourceService,
    private toaster: ToastrService
  ) {
    
  }
  
  ngOnInit(): void {
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' });
  }

  addResource(resource: Resource){
    this.resourceService.createResource(resource).subscribe({
      next: res => {
        // const transaction = {
        //   add: [user]
        // };
        // this.gridApi.applyTransaction(transaction);
        console.log(res);
        
      },
      error: err => {
        this.toaster.error(err.error.message, 'Gestionnaire maintenance');
      }
    });
    //console.log(resource);
    
    this.modalRef?.hide();
  }

  
}
