import { ERole } from './../../models/role.enum';
import { AccountService } from './../../services/account.service';
import { JwtService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  
  constructor(
    private userService: UserService, 
    private fb: FormBuilder, 
    private toaster: ToastrService,
    private jwtService: JwtService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
      ],
    });
  }

  login() {
    this.userService.login(this.form.value).subscribe({
      next: res => {
        this.jwtService.handle(res);
        this.accountService.changeStatus(true);
        this.toaster.success('Login successfully', 'Gestionnaire maintenance');
        const role = this.jwtService.getInfos().authorities[0].authority;
        if(ERole.ROLE_ADMIN == role) this.router.navigateByUrl('/users');
      },
      error: err => {
        this.toaster.error('Bad credentials, try again', 'Gestionnaire maintenance');
      }
   })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
