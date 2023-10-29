import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Services/user-auth.service';

@Injectable({
  providedIn:'root'
})


export class authGuard{
  constructor(private authService:UserAuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isLogged){
      return true;
    }
    else{
      // alert('You must login first')
      this.router.navigate(['/Login'])
      return false;
    }

  }

}
