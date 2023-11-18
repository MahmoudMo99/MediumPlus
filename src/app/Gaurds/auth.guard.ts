import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { UserAuthService } from '../Services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private authService: UserAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      // If the user is authenticated, allow access to the route
      this.authService.updateLoggedStatus(true);
      return true;
    } else {
      // If the user is not authenticated, redirect to the login page
      console.log('state Url : ' + state.url);

      this.authService.redirectUrl = state.url;
      console.log('authGuard redirectUrl : ' + this.authService.redirectUrl);
      this.router.navigate(['/Login']);
      return true;
      // return this.router.createUrlTree(['/Login']); // Redirect to login
    }
  }
}
