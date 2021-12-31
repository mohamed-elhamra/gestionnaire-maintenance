import { TextCellRendrerComponent } from './../text-cell-rendrer/text-cell-rendrer.component';
import { JwtService } from './../../services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { Resource } from './../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteBtnComponent } from '../delete-btn/delete-btn.component';

@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent implements OnInit {

  resources: Resource[] = [];

  //grid config
  columnDefs: any;
  frameworkComponents: any;
  defaultColDef: any;
  gridOptions: any;
  autoGroupColumnDef: any;
  rowData: Resource[] = []; 
  gridApi: any;
  gridColumnApi: any;

  //create resource
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private resourceService: ResourceService,
    private toaster: ToastrService,
    private jwtService: JwtService
  ) {
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'publicId',
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Name',
        field: 'name',
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Localisation',
        field: 'localisation',
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Descritpion',
        field: 'description',
        sortable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
        cellRenderer: 'textCellRenderer'
      },
      {
        headerName: 'Status',
        field: 'outOfService',
        sortable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
        resizable: true,
        cellRenderer: (params: any) => {
          if(params.value == true) return 'Out of Service'
          return 'In Service';
        }
      },
      {
        field: 'actions',
        cellRenderer: 'deleteBtlCellRenderer',
        editable: false,
        cellClass: ['no-border', 'text-center'],
        width: 50,
        cellRendererParams: {
          clicked: (params: any) => this.deleteResource(params),
        },
        minWidth: 150,
      }
    ];

    this.frameworkComponents = {
      deleteBtlCellRenderer: DeleteBtnComponent,
      textCellRenderer: TextCellRendrerComponent
    };

    this.autoGroupColumnDef = {  };

    this.gridOptions = {
      suppressCellSelection: true
    };

    this.defaultColDef = {
      flex: 1,
    };
  }
  
  ngOnInit(): void {
    const username = this.jwtService.getUsername() || '';
    this.resourceService.getResourcesByMaintenanceManager(username).subscribe({
      next: res => {
        this.resources = res;
        this.rowData = res;
      },
      error: err => {
        this.toaster.error('Something went wrong !', 'Gestionnaire maintenance');
      }
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' });
  }

  addResource(resource: Resource){
    this.resourceService.createResource(resource).subscribe({
      next: res => {
        const transaction = {
          add: [res]
        };
        this.gridApi.applyTransaction(transaction);
      },
      error: err => {
        this.toaster.error(err.error.message, 'Gestionnaire maintenance');
      }
    });
    this.modalRef?.hide();
  }

  deleteResource(params: any){
    let resourceToDelete;
    this.gridApi.forEachNode((node: any, index: any) => {
      if (node.data.publicId=== params.data.publicId) {
        node.data= params.data;
        resourceToDelete = node.data;
      }
    });
    this.gridApi.applyTransaction({ remove: [resourceToDelete] });
  }

  
}
