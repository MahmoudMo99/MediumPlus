import { environment } from '../../environments/environment';

export class AdminApiUrls {
  public static readonly BaseURL = environment.apiUrl;

  // Buildings
  public static readonly CreateBuilding =
    AdminApiUrls.BaseURL + 'Buildings/Create';
  public static readonly UpdateBuilding = AdminApiUrls.BaseURL + 'Buildings';
  public static readonly DeleteBuilding = AdminApiUrls.BaseURL + 'Buildings';
  public static readonly GetAllBuildings =
    AdminApiUrls.BaseURL + 'Buildings/GetAll';
  public static readonly GetBuildingById =
    AdminApiUrls.BaseURL + 'Buildings/GetById';
  public static readonly GetBuildingsWithFaculties =
    AdminApiUrls.BaseURL + 'buildings/getbuildingwithfaculty';
  public static readonly UpdateOrAddFacultiesToBuilding =
    AdminApiUrls.BaseURL + 'buildings/updateaddfacultytobuilding';
  public static readonly EnableOrDisableBuilding =
    AdminApiUrls.BaseURL + 'buildings/enable||disable';
  public static readonly GetBuildingWithEmployees =
    AdminApiUrls.BaseURL + 'buildings/getbuildingwithemployees';
  public static readonly UpdateOrAddEmployeesToBuilding =
    AdminApiUrls.BaseURL + 'buildings/assignandupdateassign';

  // Academic Years
  public static readonly GetAcademicYears =
    AdminApiUrls.BaseURL + 'admin/academic-years';

  // Faculties
  public static readonly CreateFaculty = AdminApiUrls.BaseURL + 'Faculty';
  public static readonly UpdateFaculty = AdminApiUrls.BaseURL + 'Faculty';
  // public static readonly GetFacultyById = AdminApiUrls.BaseURL + `Faculty/${id}`;
  // public static readonly DeleteFacultyById = AdminApiUrls.BaseURL + `Faculty/${id}`;
  public static readonly GetAllFaculties = AdminApiUrls.BaseURL + 'Faculty';

  // public static readonly GetFacultyAcceptancePercentages =
  //   AdminApiUrls.BaseURL + `Admin/faculty-acceptance-percentages/${academicYearId}`;
  public static readonly UpdatePercentageOfFaculty =
    AdminApiUrls.BaseURL + 'Admin/faculty-acceptance-percentages';

  // Floor
  public static readonly CreateFloor = AdminApiUrls.BaseURL + 'Floors/Create';
  public static readonly UpdateFloor = AdminApiUrls.BaseURL + 'Floors';
  public static readonly DeleteFloor = AdminApiUrls.BaseURL + 'Floors';
  public static readonly GetFloorById = AdminApiUrls.BaseURL + 'Floors/GetById';
  public static readonly GetAllFloorsForBuilding =
    AdminApiUrls.BaseURL + 'Floors/GetAll';

  // Rooms
  public static readonly CreateRoom = AdminApiUrls.BaseURL + 'Rooms';
  public static readonly UpdateRoom = AdminApiUrls.BaseURL + 'Rooms';
  public static readonly DeleteRoom = AdminApiUrls.BaseURL + 'Rooms';
  public static readonly GetRoomById =
    AdminApiUrls.BaseURL + 'rooms/getroombyidadmin';
  public static readonly GetAllRooms = AdminApiUrls.BaseURL + 'Rooms/GetAll';

  // Employee
  public static readonly CreateEmployee = AdminApiUrls.BaseURL + 'employees';
  public static readonly UpdateEmployee = AdminApiUrls.BaseURL + 'employees';
  public static readonly DeleteEmployee = AdminApiUrls.BaseURL + 'employees';
  public static readonly GetEmployeeById = AdminApiUrls.BaseURL + 'employees';
  public static readonly GetAllEmployees =
    AdminApiUrls.BaseURL + 'employees/getall';

  // Housing Applications
  public static readonly GetAllStudentsHousingApplications =
    AdminApiUrls.BaseURL + 'Admin/HousingApps';
  // public static readonly GetStudentsHousingApplicationById = AdminApiUrls.BaseURL + `Admin/HousingApps/${id}`;
  public static readonly UpdateHousingStatus =
    AdminApiUrls.BaseURL + 'Admin/HousingApps/status';

  // Terms and Conditions
  public static readonly CreateTermsAndConditions =
    AdminApiUrls.BaseURL + 'termsandconditions';
  public static readonly UpdateTermsAndConditions =
    AdminApiUrls.BaseURL + 'termsandconditions';
  public static readonly DeleteTermsAndConditions =
    AdminApiUrls.BaseURL + 'termsandconditions';
  public static readonly GetTermsAndConditionsById =
    AdminApiUrls.BaseURL + 'termsandconditions';
  public static readonly GetAllTermsAndConditions =
    AdminApiUrls.BaseURL + 'termsandconditions/getall';
  public static readonly ApplyAutomaticFilter =
    AdminApiUrls.BaseURL + 'admin/acceptance-settings/automatic-filter';

  // Housed Students

  public static readonly GetAllHousedStudents =
    AdminApiUrls.BaseURL + 'students/allstudentsalreadyhousing';

  public static readonly getHousedStudentById =
    AdminApiUrls.BaseURL + 'students/getstudendetails';

  // violation and Reconciliation
  public static readonly createViolation =
    AdminApiUrls.BaseURL + 'violationandreconciliation/addviolation';
  public static readonly CreateReconciliation =
    AdminApiUrls.BaseURL + 'violationandreconciliation/addreconciliation';
  public static readonly updateViolation =
    AdminApiUrls.BaseURL + 'violationandreconciliation/editviolation';
  public static readonly updateReconciliation =
    AdminApiUrls.BaseURL + 'violationandreconciliation/editreconciliation';
  public static readonly GetViolationById =
    AdminApiUrls.BaseURL + 'violationandreconciliation/getviolationbyid';
  public static readonly GetReconciliationById =
    AdminApiUrls.BaseURL + 'violationandreconciliation/getreconciliationbyid';
  public static readonly GetAllStudentsHaveViolation =
    AdminApiUrls.BaseURL + 'students/getallstudentshaveviolation';
  public static readonly GetAllViolationRelatedToStudent =
    AdminApiUrls.BaseURL + 'students/id';
}
