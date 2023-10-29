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
