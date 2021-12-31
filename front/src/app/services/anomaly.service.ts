import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anomaly } from '../models/anomaly.model';

@Injectable({
  providedIn: 'root'
})
export class AnomalyService {

  constructor(
    private http: HttpClient
  ) { }


  createAnomaly(anomaly: Anomaly): Observable<Anomaly>{
    return this.http.post<Anomaly>(`${environment.apiURL}/anomalies`, anomaly);
  }

}
