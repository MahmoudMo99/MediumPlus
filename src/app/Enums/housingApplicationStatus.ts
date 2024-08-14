export const housingApplicationStatus = {
  Pending: { id: 1, name: 'Pending', arName: 'معلق' },
  Approved: { id: 2, name: 'Approved', arName: 'تمت الموافقة عليه' },
  Rejected: { id: 3, name: 'Rejected', arName: 'مرفوض' },
  InProgress: { id: 4, name: 'InProgress', arName: 'قيد التقدم' },
  Excepted: { id: 5, name: 'Excepted', arName: 'مستثنى' },
};

export type EnumValue = {
  id: number;
  name: string;
  arName: string;
};
