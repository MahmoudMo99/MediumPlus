import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private isLoggedSubject: BehaviorSubject<boolean>;
  redirectUrl: string;

  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);
    this.redirectUrl = '';
  }
  login(email: string, password: string) {
    let userToken = '516512';
    localStorage.setItem('token', userToken);
    this.isLoggedSubject.next(true);
  }
  signup(email: string, userName: string, password: string) {
    // Create a new user object
    const newUser = {
      email: email,
      userName: userName,
      password: password,
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.login(email, password);
  }
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
