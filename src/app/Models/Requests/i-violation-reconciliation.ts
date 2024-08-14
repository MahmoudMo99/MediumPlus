import { FormControl } from '@angular/forms';

export interface IViolation {
  description: string;
  violationType: number;
  housingApplicationId: number;
}

export interface IViolationUpdate extends IViolation {
  id: number;
}

export interface IReconciliation {
  violationId: number;
  description: string;
}

export interface IReconciliationUpdate extends IReconciliation {
  id: number;
}

export interface IViolationForm {
  description: FormControl<string>;
  violationType: FormControl<number>;
}

export interface IReconciliationForm {
  description: FormControl<string>;
}
