import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private isLoggedSubject:BehaviorSubject<boolean>;

  constructor() {
    this.isLoggedSubject=new BehaviorSubject<boolean>(this.isLogged);
   }
  login(email: string,password: string){
    let usertoken="516512";
    localStorage.setItem("token",usertoken);
    this.isLoggedSubject.next(true);
  }
  signup(email: string,userName:string ,password: string) {
    // Create a new user object
    const newUser = {
      email: email,
      userName:userName,
      password: password,
    };

    // Store the new user data in local storage or send it to a backend server
    // For demonstration purposes, let's store it in local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Automatically log in the newly signed up user
    this.login(email, password);
  }
  logout(){
    localStorage.removeItem("token");
    this.isLoggedSubject.next(false);

  }
  get isLogged():boolean{
    return (localStorage.getItem("token"))? true: false;
  }

  loggedStatus():Observable<boolean>{
    return this.isLoggedSubject.asObservable();
  }

}
