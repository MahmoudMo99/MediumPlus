export interface IViolationResponses {
  id: number;
  description: string;
  date: string;
  violationId: number;
}
export interface IReconciliationResponses {
  id: number;
  description: string;
  isCanceled: boolean;
  date: string;
  violationType: number;
  violationTypeName: string;
  housingApplicationId: number;
}

export interface IViolationsResponses {
  studentName: string;
  studentNationalNumber: string;
  studentFaculty: string;
  type: string;
  reason: string;
  date: string;
  cancelDate: string;
  cancelReason: string;
}

// سيتم نقله
export interface IStudentViolationData {
  photo: string;
  name: string;
  nationalNumber: string;
  faculty: string;
  department: string;
  building: string;
  level: string;
  roomNumber: string;
  isThereReconciliation: boolean;
  violations: [
    {
      academicYear: string;
      violationId: number;
      violationType: string;
      reasonViolation: string;
      dateViolation: string;
      reconciliation: {
        reconciliationId: number;
        reasonReconciliation: string;
        dateReconciliation: string;
      };
    }
  ];
}
