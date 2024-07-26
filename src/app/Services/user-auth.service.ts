import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserProfile } from '../Models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private userRole: string | null = null;

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private userSubject$ = new Subject<UserProfile>();
  redirectUrl: string = '';
  constructor(private httpClient: HttpClient, private router: Router) {}

  getCurrentUserInfo(): Observable<any> {
    return this.httpClient.get(
      environment.APISERVER + '/api/publishers' + '/' + this.decodedToken?.sub,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
  getUserRole(): string | null {
    return this.userRole;
  }
  get token(): string | null {
    let token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/Login']);
      // throw new Error( 'Token not found, please login again.' );
      console.error('Token not found, please login again.');
      return null;
    }

    return token;
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  get userId() {
    return Number(this.decodedToken?.sub);
  }
  get decodedToken() {
    try {
      if (!this.token) {
        return null; // No token available
      }
      const payload = jwtDecode(this.token);
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Failed to decode token
    }
  }

  updateCurrentUser(user: UserProfile) {
    this.userSubject$.next(user);
  }
  updateLoggedStatus(status: boolean) {
    this.isLoggedSubject.next(status);
  }
  getUserUpdates() {
    return this.userSubject$.asObservable();
  }

  goToRedirectUrl() {
    console.log('Redirect in auth :' + this.redirectUrl);
    const redirectUrl = this.redirectUrl || '/Home';
    this.router.navigate([redirectUrl]);
    this.redirectUrl = '';
  }
  login(username: string, password: string) {
    const loginData = {
      username,
      password,
    };

    // Make an HTTP POST request to your login API
    return this.httpClient
      .post<any>(`${environment.APISERVER}/api/accounts/login`, loginData)
      .pipe(
        tap((response: any) => {
          this.handleAuthentication(response);
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.updateLoggedStatus(false);
    this.updateCurrentUser({} as UserProfile);
  }

  loggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
  get isLogged(): boolean {
    return this.token != null ? true : false;
  }
  isAuthenticated(): boolean {
    const token = this.token;
    return !!token;
  }

  // Handle authentication response
  private handleAuthentication(response: any): void {
    const token = response.data.token;

    if (token) {
      this.setToken(token);
      this.getCurrentUserInfo().subscribe({
        next: (res) => {
          this.updateLoggedStatus(true);
          this.updateCurrentUser(res.data);
          this.goToRedirectUrl();
        },
        error: (error) =>
          console.error('Error fetching user info after login:', error),
      });
    } else {
      console.error('Token or refreshToken is missing in the login response.');
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('AuthService error:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
