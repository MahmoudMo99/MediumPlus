import { environment } from '../../environments/environment';
export class ApiLinks {
  public static readonly BaseURL = `${environment.domain}/api`;
  public static readonly AdminBaseURL = `${ApiLinks.BaseURL}/admin`;
  public static readonly StudentBaseURL = `${ApiLinks.BaseURL}/student`;
  public static readonly SharedBaseURL = `${ApiLinks.BaseURL}/shared`;

  public static readonly Auth = {
    Login: `${ApiLinks.BaseURL}/auth/login`,
    Register: `${ApiLinks.BaseURL}/auth/register`,
    ResetPassword: `${ApiLinks.BaseURL}/auth/reset-password`,
    GetResetPasswordEmail: (email: string) =>
      `${ApiLinks.BaseURL}/auth/reset-password/${email}`,
  };
  public static readonly Shared = {
    Buildings: {
      GetAll: `${ApiLinks.SharedBaseURL}/buildings`,
    },
  };
  public static readonly Admin = {
    Buildings: {
      Create: `${ApiLinks.AdminBaseURL}/buildings`,
      Update: `${ApiLinks.AdminBaseURL}/buildings`,
      Delete: (id: number) => `${ApiLinks.AdminBaseURL}/buildings/${id}`,

      GetById: (id: number) => `${ApiLinks.AdminBaseURL}/buildings/${id}`,
      ActivationState: `${ApiLinks.AdminBaseURL}/buildings/activation-state`,
      UpdateAssignedFaculties: (buildingId: number) =>
        `${ApiLinks.AdminBaseURL}/buildings/${buildingId}/faculties`,
      GetWithFaculties: `${ApiLinks.AdminBaseURL}/buildings/buildings-with-faculties-info`,

      GetWithEmployees: `${ApiLinks.AdminBaseURL}/buildings/buildings-with-employees-info`,
      UpdateOrAddEmployees: (buildingId: number) =>
        `${ApiLinks.AdminBaseURL}/buildings/${buildingId}/employees`,
    },
    AcademicYears: `${ApiLinks.BaseURL}/configuration/academic-years`,
    Faculties: {
      Create: `${ApiLinks.BaseURL}/Faculty`,
      Update: `${ApiLinks.BaseURL}/Faculty`,
      GetAll: `${ApiLinks.BaseURL}/Faculty`,
      UpdatePercentage: `${ApiLinks.BaseURL}/Admin/faculty-acceptance-percentages`,
    },
    Floors: {
      Create: `${ApiLinks.BaseURL}/Floors/Create`,
      Update: `${ApiLinks.BaseURL}/Floors`,
      Delete: `${ApiLinks.BaseURL}/Floors`,
      GetById: `${ApiLinks.BaseURL}/Floors/GetById`,
      GetAllForBuilding: `${ApiLinks.BaseURL}/Floors/GetAll`,
    },
    Rooms: {
      Create: `${ApiLinks.BaseURL}/Rooms`,
      Update: `${ApiLinks.BaseURL}/Rooms`,
      Delete: `${ApiLinks.BaseURL}/Rooms`,
      GetById: `${ApiLinks.BaseURL}/rooms/getroombyidadmin`,
      GetAll: `${ApiLinks.BaseURL}/Rooms/GetAll`,
    },
    Employees: {
      Create: `${ApiLinks.BaseURL}/employees`,
      Update: `${ApiLinks.BaseURL}/employees`,
      Delete: `${ApiLinks.BaseURL}/employees`,
      GetById: `${ApiLinks.BaseURL}/employees`,
      GetAll: `${ApiLinks.BaseURL}/employees/getall`,
    },
    HousingApplications: {
      GetAll: `${ApiLinks.BaseURL}/Admin/HousingApps`,
      UpdateStatus: `${ApiLinks.BaseURL}/Admin/HousingApps/status`,
    },
    TermsAndConditions: {
      Create: `${ApiLinks.BaseURL}/termsandconditions`,
      Update: `${ApiLinks.BaseURL}/termsandconditions`,
      Delete: `${ApiLinks.BaseURL}/termsandconditions`,
      GetById: `${ApiLinks.BaseURL}/termsandconditions`,
      GetAll: `${ApiLinks.BaseURL}/termsandconditions/getall`,
      ApplyAutomaticFilter: `${ApiLinks.BaseURL}/admin/system/automatic-filter`,
    },
    HousedStudents: {
      GetAll: `${ApiLinks.BaseURL}/students/allstudentsalreadyhousing`,
      GetById: `${ApiLinks.BaseURL}/students/getstudendetails`,
    },
    Evacuation: {
      Patch: `${ApiLinks.BaseURL}/housing/evacuation`,
    },
    ViolationAndReconciliation: {
      CreateViolation: `${ApiLinks.BaseURL}/violationandreconciliation/addviolation`,
      CreateReconciliation: `${ApiLinks.BaseURL}/violationandreconciliation/addreconciliation`,
      UpdateViolation: `${ApiLinks.BaseURL}/violationandreconciliation/editviolation`,
      UpdateReconciliation: `${ApiLinks.BaseURL}/violationandreconciliation/editreconciliation`,
      GetViolationById: `${ApiLinks.BaseURL}/violationandreconciliation/getviolationbyid`,
      GetReconciliationById: `${ApiLinks.BaseURL}/violationandreconciliation/getreconciliationbyid`,
      GetAllStudentsWithViolation: `${ApiLinks.BaseURL}/students/getallstudentshaveviolation`,
      GetAllViolationRelatedToStudent: `${ApiLinks.BaseURL}/students/id`,
    },
    AcceptanceSettings: {
      GetByAcademicYearId: (academicYearId: number) =>
        `${ApiLinks.AdminBaseURL}/acceptance-settings/${academicYearId}`,
      Update: `${ApiLinks.AdminBaseURL}/acceptance-settings`,
      Statistics: (id: number) =>
        `${ApiLinks.AdminBaseURL}/acceptance-settings/statistics/${id}`,
    },
    Beds: {
      Create: `${ApiLinks.AdminBaseURL}/beds`,
      Update: `${ApiLinks.AdminBaseURL}/beds`,
      Delete: (id: number) => `${ApiLinks.AdminBaseURL}/beds/${id}`,
      GetAll: `${ApiLinks.AdminBaseURL}/beds`,
      GetById: (id: number) => `${ApiLinks.AdminBaseURL}/beds/${id}`,
    },
  };

  public static readonly Student = {
    Buildings: {
      GetAll: `${ApiLinks.BaseURL}/buildings/GetAllForStudent`,
      GetById: `${ApiLinks.BaseURL}/buildings/GetByIdForStudent`,
      // Add more student building URLs as needed
    },
    HousingApplications: {
      SelectBed: `${ApiLinks.StudentBaseURL}/housing-applications/bed-selection`,
    },
    // Add other student-related endpoints as needed
  };
}
