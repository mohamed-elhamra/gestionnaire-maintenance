import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiURL}/users/authenticate`, data);
  }

  getMaintenanceManager(){
    return this.http.get<User[]>(`${environment.apiURL}/users/maintenanceManagers`);
  }

}
