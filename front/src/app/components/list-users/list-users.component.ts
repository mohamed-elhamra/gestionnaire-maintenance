import { DeleteBtnComponent } from './../delete-btn/delete-btn.component';
import {  Component, OnInit, TemplateRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  maintenanceManagers: User[] = [];
  
  //grid config
  columnDefs: any;
  frameworkComponents: any;
  defaultColDef: any;
  gridOptions: any;
  autoGroupColumnDef: any;
  rowData: User[] = []; 
  gridApi: any;
  gridColumnApi: any;

  //create user
  modalRef?: BsModalRef;

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private modalService: BsModalService
  ) { 
    this.columnDefs = [
      {
        headerName: 'User name',
        field: 'username',
        sortable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'First name',
        field: 'firstName',
        sortable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Last name',
        field: 'lastName',
        sortable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Email',
        field: 'email',
        sortable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
        resizable: true,
      },
      {
        field: 'delete',
        cellRenderer: 'deleteBtlCellRenderer',
        editable: false,
        cellClass: ['no-border', 'text-center'],
        width: 50,
        cellRendererParams: {
          clicked: (params: any) => this.deleteUser(params),
        },
        minWidth: 150,
      }
    ];

    this.frameworkComponents = {
      deleteBtlCellRenderer: DeleteBtnComponent
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
    this.userService.getMaintenanceManager().subscribe({
      next: res => {
        this.maintenanceManagers = res;
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

  deleteUser(params: any){
    let userToDelete;
    this.gridApi.forEachNode((node: any, index: any) => {
      if (node.data.username === params.data.username) {
        node.data= params.data;
        userToDelete = node.data;
      }
    });
    this.gridApi.applyTransaction({ remove: [userToDelete] });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' });
  }

  addUser(user: User){
    this.userService.createMaintenanceManager(user).subscribe({
      next: res => {
        const transaction = {
          add: [user]
        };
        this.gridApi.applyTransaction(transaction);
      },
      error: err => {
        this.toaster.error(err.error.message, 'Gestionnaire maintenance');
      }
    })
    this.modalRef?.hide();
  }

}
