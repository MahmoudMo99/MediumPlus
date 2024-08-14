import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResetPassword } from '../Models/ireset-password';
import { Observable } from 'rxjs';
import { ApiLinks } from '../Constant/ApiLinks';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  //For send email to reset password
  sendResetEmail(email: string): Observable<any> {
    return this.http.get<any>(ApiLinks.Auth.GetResetPasswordEmail(email));
  }
  // to reset password component
  resetPassword(resetPasswordObj: IResetPassword): Observable<any> {
    return this.http.post<any>(ApiLinks.Auth.ResetPassword, resetPasswordObj);
  }
}
