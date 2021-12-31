import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  createResource(resource: Resource): Observable<Resource>{
    return this.http.post<Resource>(`${environment.apiURL}/resources`, resource);
  }

  getResourcesByMaintenanceManager(username: string): Observable<Resource[]>{
    return this.http.get<Resource[]>(`${environment.apiURL}/users/${username}/resources`);
  }

  deleteResource(publicId: string){
    return this.http.delete(`${environment.apiURL}/resources/${publicId}`);
  }

  getResourceByPublicId(publicId: string): Observable<Resource>{
    return this.http.get<Resource>(`${environment.apiURL}/resources/${publicId}`);
  }

}
