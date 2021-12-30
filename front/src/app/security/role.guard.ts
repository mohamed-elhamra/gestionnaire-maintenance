import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ERole } from '../models/role.enum';
import { AccountService } from '../services/account.service';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(!this.jwtService.isLogged()){
      this.jwtService.remove();
      this.accountService.changeStatus(false);
      this.router.navigateByUrl('/login');
      return false;
    }

    const role = this.jwtService.getInfos().authorities[0].authority;

    if(state.url === "/resources"){
      if(ERole.ROLE_ADMIN == role){
        this.router.navigateByUrl('/users');
        return false;
      }
    }

    if(state.url === "/users"){
      if(ERole.ROLE_MAINTENANCE_MANAGER == role){
        this.router.navigateByUrl('/resources');
        return false;
      }
    }
    
    return true;
  }
  
}
