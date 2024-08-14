import { IHousing } from '../i-housing';

export interface IEditHousingAppRequest extends IHousing {
  housingApplicationId: number;
}
