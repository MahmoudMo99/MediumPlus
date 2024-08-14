import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private role$ = new BehaviorSubject<string>('');
  constructor() {}

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getRoleForStore() {
    return this.role$.asObservable();
  }
}
