import { JwtService } from './../../services/jwt.service';
import { Resource } from './../../models/resource.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  @Output() addResourceEvent = new EventEmitter<Resource>();

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      localisation: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    });
  }

  onSubmit() {
    let resource = new Resource();
    resource.name = this.form.get('name')?.value;
    resource.localisation = this.form.get('localisation')?.value;
    resource.description = this.form.get('description')?.value;
    resource.maintenanceManager = this.jwtService.getUsername() || '';
    
    this.addResourceEvent.emit(resource);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
