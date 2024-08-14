import type { CanDeactivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const canDeactivateGuard: CanDeactivateFn<IDeactivateComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate();
};

export interface IDeactivateComponent {
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}
