import { CloseAnomalyBtnCellRendrerComponent } from './../close-anomaly-btn-cell-rendrer/close-anomaly-btn-cell-rendrer.component';
import { JwtService } from './../../services/jwt.service';
import { UserService } from 'src/app/services/user.service';
import { Anomaly } from './../../models/anomaly.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TextCellRendrerComponent } from '../text-cell-rendrer/text-cell-rendrer.component';
import * as moment from 'moment';

@Component({
  selector: 'app-list-anomalies',
  templateUrl: './list-anomalies.component.html',
  styleUrls: ['./list-anomalies.component.css']
})
export class ListAnomaliesComponent implements OnInit {


  resources: Anomaly[] = [];

  //grid config
  columnDefs: any;
  frameworkComponents: any;
  defaultColDef: any;
  gridOptions: any;
  autoGroupColumnDef: any;
  rowData: Anomaly[] = []; 
  gridApi: any;
  gridColumnApi: any;

  //create resource
  modalRef?: BsModalRef;

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { 
    this.columnDefs = [
      {
        headerName: 'Title',
        field: 'title',
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Description',
        field: 'description',
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
        cellRenderer: 'textCellRenderer'
      },
      {
        headerName: 'Date',
        field: 'date',
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Resource ID',
        field: 'resourcePublicId',
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        cellClass: ['text-center'],
      },
      {
        headerName: 'Status',
        field: 'status',
        sortable: true,
        resizable: true,
        cellClass: ['text-center'],
      },
      {
        field: 'Close ticket',
        cellRenderer: 'closeAnomalyBtnCellRendrerComponent',
        editable: false,
        cellClass: ['no-border', 'text-center'],
        width: 20,
        cellRendererParams: {
          clicked: (params: any) => {},
        },
      },
    ];

    this.frameworkComponents = {
      closeAnomalyBtnCellRendrerComponent: CloseAnomalyBtnCellRendrerComponent,
      textCellRenderer: TextCellRendrerComponent,
    };

    this.autoGroupColumnDef = {  };

    this.gridOptions = {
      suppressCellSelection: true
    };

    this.defaultColDef = {
      flex: 1,
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnInit(): void {
    this.userService.getAnomaliesByUser(this.jwtService.getUsername() || '').subscribe({
      next: res => {
        this.rowData = res;
      },
      error: err => {

      }
    });
  }

}

