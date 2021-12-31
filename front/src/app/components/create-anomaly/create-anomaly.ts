import { ToastrService } from 'ngx-toastr';
import { ResourceService } from './../../services/resource.service';
import { Anomaly } from './../../models/anomaly.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { param } from 'jquery';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resource } from 'src/app/models/resource.model';
import { AnomalyService } from 'src/app/services/anomaly.service';

@Component({
  selector: 'app-anomaly',
  templateUrl: './create-anomaly.component.html',
  styleUrls: ['./create-anomaly.component.css']
})
export class CreateAnomalyComponent implements OnInit {

  resource: Resource = new Resource();

  form: FormGroup = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private anomalyService: AnomalyService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(450)]],
    });
    this.activatedRoute.params.subscribe(param => {
      this.resourceService.getResourceByPublicId(param['publicId']).subscribe({
        next: res => {
          this.resource = res;
        },
        error: err => {
          this.toaster.error(err.error.message, 'Gestionnaire maintenance');
        }
      })
    });
  }

  onSubmit() {
    let anomaly = new Anomaly();
    anomaly.title = this.form.get('title')?.value;
    anomaly.description = this.form.get('description')?.value;
    anomaly.resourcePublicId = this.resource.publicId;
    
    this.anomalyService.createAnomaly(anomaly).subscribe({
      next: res => {
        this.toaster.success('We have received you declaration, we will solve the probleme as soon as possible', 'Gestionnaire maintenance');
        this.form.reset();
      },
      error: err => {
        this.toaster.error(err.error.message, 'Gestionnaire maintenance');
        this.form.reset();
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
