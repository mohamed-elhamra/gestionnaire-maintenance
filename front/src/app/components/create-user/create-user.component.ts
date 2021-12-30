import { ERole } from './../../models/role.enum';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user.model';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  @Output() addUserEvent = new EventEmitter<User>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required],
      ],
    }, { validators: PasswordValidator });
  }

  onSubmit() {
    let user = new User();
    user.firstName = this.form.get('firstName')?.value;
    user.lastName = this.form.get('lastName')?.value;
    user.email = this.form.get('email')?.value;
    user.username = this.form.get('username')?.value;
    user.password = this.form.get('password')?.value;
    user.role = ERole.ROLE_MAINTENANCE_MANAGER;
    this.addUserEvent.emit(user);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
