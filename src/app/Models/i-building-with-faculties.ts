import { IFacultySelect } from "./ifaculty";

export interface IBuildingWithFaculties {
  id: number;
  name: string;
  type: string;
  facultyDetails: IFacultySelect[];
}
