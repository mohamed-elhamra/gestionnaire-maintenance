import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  dataTable: any = [];
  dtOptions: any = [];
  maintenanceManagers: User[] = [];

  @ViewChild('dataTable', {static: true}) table: any;

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userService.getMaintenanceManager().subscribe({
      next: res => {
        console.log(res);
        
        this.maintenanceManagers = res;
        this.dtOptions = {
          data: this.maintenanceManagers,
          columns: [
            {title: 'User name', data: 'username'},
            {title: 'First name', data: 'firstName'},
            {title: 'Last name', data: 'lastName'},
            {title: 'Email', data: 'email'},
          ]
        }
      },
      error: err => {
        this.toaster.error('Bad credentials, try again', 'Gestionnaire maintenance');
      },
      complete: () => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      }
    })
  }

}
