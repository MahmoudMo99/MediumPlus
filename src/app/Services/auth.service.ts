import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { serialize } from 'object-to-formdata';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { ILoginRequest } from 'src/app/Models/Requests/IloginRequest';
import { ILoginResponse } from 'src/app/Models/Responses/IloginResponse';
import { IRegistrationRequest } from 'src/app/Models/i-registration';
import { ApiLinks } from '../Constant/ApiLinks';
import { TokenModel } from '../Models/token-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get IsStudent() {
    if (this.tokenModel) {
      return this.tokenModel.roles.includes('Student');
    }
    return false;
  }
  get IsAdmin() {
    if (this.tokenModel) {
      return this.tokenModel.roles.includes('Admin');
    }
    return false;
  }
  get IsSuperAdmin(){
    if(this.tokenModel){
      return this.tokenModel.roles.includes('SuperAdmin');
    }
    return false;
  }

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  get tokenModel() {
    if (this.isAuthenticated()) {
      let token = this.jwtHelper.decodeToken<TokenModel>(this.currentToken!);

      if (token != null) {
        //roles: "admin"
        token.roles = Array.isArray(token.roles) ? token.roles : [token.roles]; // roles: ["admin"]

        return token;
      }
    }
    return null;
  }

  get currentToken() {
    return localStorage.getItem(API.TOKEN_KEY_NAME);
  }

  constructor(private http: HttpClient) {
    this.updateLoggedInStatus(this.isAuthenticated());
  }
  //#region public methods
  isAuthenticated() {
    return !!this.currentToken && this.isTokenValid(this.currentToken);
  }

  login(user: ILoginRequest) {
    return this.http
      .post<IApiResponse<ILoginResponse>>(ApiLinks.Auth.Login, user)
      .pipe(
        tap((res) => {
          this.saveToken(res.data.token);
          this.updateLoggedInStatus(true);
        })
      );
  }

  logout() {
    this.updateLoggedInStatus(false);
    this.deleteCurrentToken();
  }
  isSessionExpired() {
    return this.currentToken ? this.isTokenExpired(this.currentToken) : false;
  }

  hasRoles(roles: string[]) {
    if (!this.tokenModel) {
      return false;
    }
    return roles.some((r) => this.tokenModel.roles.includes(r));
  }

  registration(user: IRegistrationRequest): Observable<any> {
    let formData = serialize(user);
    formData.append('student.ProfilePhoto', user.student.profilePhoto);
    formData.append('student.IDCardPhoto', user.student.iDCardPhoto);

    return this.http.post(ApiLinks.Auth.Register, formData, {
      headers: { enctype: 'multipart/form-data' },
    });
  }

  //#endregion

  //#region private methods
  private updateLoggedInStatus(isLoggedIn: boolean) {
    this._isLoggedIn$.next(isLoggedIn);
  }
  private saveToken(token: string) {
    localStorage.setItem(API.TOKEN_KEY_NAME, token);
  }
  private deleteCurrentToken() {
    localStorage.removeItem(API.TOKEN_KEY_NAME);
  }
  private isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }
  private canDecodeToken(token: string) {
    try {
      this.jwtHelper.decodeToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
  private isTokenValid(token: string) {
    return this.canDecodeToken(token) && !this.isTokenExpired(token);
  }
  //#endregion
}

export const API = {
  TOKEN_KEY_NAME: 'token',
};
