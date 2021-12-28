import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  set(data: any) {
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('username', data.username);
  }

  handle(data: any) {
    this.set(data);
  }

  getJwt() {
    return localStorage.getItem('jwt');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  remove() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  payload(jwt: string) {
    const payload = jwt.split('.')[1];
    return this.decode(payload);
  }

  isValid() {
    const jwt = this.getJwt();
    const username = this.getUsername();

    if (jwt) {
      const payload = this.payload(jwt);
      if (payload) {
        return username == payload.username;
      }
    }
    return false;
  }

  getInfos() {
    const jwt = this.getJwt();
    if (jwt) {
      const payload = this.payload(jwt);
      return payload ? payload : null;
    }
    return null;
  }

  isLogged() {
    return this.isValid();
  }

}
