import { Anomaly } from './../models/anomaly.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getAnomaliesByTitle(title: string, resourcePublicId: string): Observable<Anomaly[]>{
    return this.http.get<Anomaly[]>(`${environment.apiURL}/anomalies/${title}?resourcePublicId=${resourcePublicId}`);
  }

}
