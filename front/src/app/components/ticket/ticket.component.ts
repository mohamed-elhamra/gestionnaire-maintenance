import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/models/resource.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  resource: Resource = new Resource();
  resourceLinK: string = '';

  constructor(
    private resourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.resourceService.getResourceByPublicId(params['publicId']).subscribe({
        next: res => {
          this.resource = res;
          this.resourceLinK = `${environment.frontUrl}/resources/${this.resource.publicId}/anomaly`;
        },
        error: err =>{
          this.toaster.error(err.error.message, 'Gestionnaire maintenance');
          this.router.navigateByUrl("/resources");
        }
      });
    });
    
  }

}
