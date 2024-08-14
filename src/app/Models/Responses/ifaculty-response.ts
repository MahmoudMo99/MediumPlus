export interface IFacultyResponse {
  id: number;
  name: string;
  universityId: number;
  facultyType: number;
  facultyTypeName: string;
  numOfDepartments: number;
}

export interface IUpdatePercentageOfFaculty {
  academicYearId: number;
  facultyAcceptancePercentages: [
    {
      facultyId: number;
      percentage: number;
    }
  ];
}

export interface IPercentageOfFacultyResponse {
  academicYearId: number;
}



/*
// تعديل طه
export type IUpdatePercentageOfFaculty = ReturnType<
  FormGroup<IUpdatePercentageOfFacultyForm>['getRawValue']
>;

export type IUpdatePercentageOfFacultyForm = {
  academicYearId: FormControl<number>;
  facultyAcceptancePercentages: FormArray<
    FormGroup<{
      facultyId: FormControl<number>;
      percentage: FormControl<number>;
    }>
  >;
};

*/