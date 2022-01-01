import { ERole } from './../../models/role.enum';
import { AccountService } from './../../services/account.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUser: any;
  
  //confirm modal
  modalRef?: BsModalRef;

  isMaintenanceManager: boolean = true;

  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe((res) => {
      this.currentUser = this.jwtService.getInfos();
      if(this.currentUser)
        this.isMaintenanceManager = ERole.ROLE_MAINTENANCE_MANAGER === this.currentUser.authorities[0].authority;
    });
  }

  logout(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.jwtService.remove();
    this.accountService.changeStatus(false);
    this.modalRef?.hide();
    this.toastr.success('See you soon', 'Gestionnaire maintenance');
    this.router.navigateByUrl('/login');
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
