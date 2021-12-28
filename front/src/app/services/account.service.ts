import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private jwtService: JwtService) {}

  private isLogged = new BehaviorSubject<boolean>(this.jwtService.isLogged());
  authStatus = this.isLogged.asObservable();

  changeStatus(status: boolean) {
    this.isLogged.next(status);
  }
}
