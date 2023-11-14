import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private userRole: string | null = null;

  private isLoggedSubject: BehaviorSubject<boolean>;
  redirectUrl: string;

  get token() {
    return localStorage.getItem('token');
  }
  get user() {
    let payload = jwtDecode(this.token!);
    console.log(payload);
    return payload;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);
    this.redirectUrl = '';
  }
  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedSubject.next(true);
  }
  // signup(email: string, userName: string, password: string) {
  //   // Create a new user object
  //   const newUser = {
  //     email: email,
  //     userName: userName,
  //     password: password,
  //   };

  //   const users = JSON.parse(localStorage.getItem('users') || '[]');
  //   users.push(newUser);
  //   localStorage.setItem('users', JSON.stringify(users));

  //   this.login(email);
  // }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedSubject.next(false);
  }
  get isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  loggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
