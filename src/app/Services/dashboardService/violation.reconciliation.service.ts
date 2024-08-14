import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import {
  IReconciliation,
  IReconciliationUpdate,
  IViolation,
  IViolationUpdate,
} from 'src/app/Models/Requests/i-violation-reconciliation';
import {
  IReconciliationResponses,
  IStudentViolationData,
  IViolationResponses,
  IViolationsResponses,
} from 'src/app/Models/Responses/i-violation-reconciliation-responses';

@Injectable({
  providedIn: 'root',
})
export class ViolationReconciliationService {
  constructor(private httpClient: HttpClient) {}

  CreateViolation(data: IViolation): Observable<IViolation> {
    return this.httpClient.post<IViolation>(
      ApiLinks.Admin.ViolationAndReconciliation.CreateViolation,
      data
    );
  }

  CreateReconciliation(data: IReconciliation): Observable<IReconciliation> {
    return this.httpClient.post<IReconciliation>(
      ApiLinks.Admin.ViolationAndReconciliation.CreateReconciliation,
      data
    );
  }

  UpdateViolation(data: IViolationUpdate): Observable<IViolationUpdate> {
    return this.httpClient.patch<IViolationUpdate>(
      ApiLinks.Admin.ViolationAndReconciliation.UpdateViolation,
      data
    );
  }

  UpdateReconciliation(
    data: IReconciliationUpdate
  ): Observable<IReconciliationUpdate> {
    return this.httpClient.patch<IReconciliationUpdate>(
      ApiLinks.Admin.ViolationAndReconciliation.UpdateReconciliation,
      data
    );
  }

  getViolation(id: number): Observable<IApiResponse<IViolationResponses>> {
    let params = new HttpParams().set('Id', id);

    return this.httpClient.get<IApiResponse<IViolationResponses>>(
      ApiLinks.Admin.ViolationAndReconciliation.GetViolationById,
      { params }
    );
  }

  getReconciliation(
    id: number
  ): Observable<IApiResponse<IReconciliationResponses>> {
    let params = new HttpParams().set('Id', id);
    return this.httpClient.get<IApiResponse<IReconciliationResponses>>(
      ApiLinks.Admin.ViolationAndReconciliation.GetReconciliationById,
      { params }
    );
  }

  getAllStudentsHaveViolation(
    PageNumber: number,
    PageSize: number,
    FacultyId: number,
    Search: string,
    SortBy: string,
    SortAscending: boolean,
    ViolationType: number,
    AcademicYearId: number
  ): Observable<IApiPaginateResponse<IViolationsResponses[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('FacultyId', FacultyId)
      .set('Search', Search)
      .set('SortBy', SortBy)
      .set('SortAscending', SortAscending)
      .set('ViolationType', ViolationType)
      .set('AcademicYearId', AcademicYearId);
    return this.httpClient.get<IApiPaginateResponse<IViolationsResponses[]>>(
      ApiLinks.Admin.ViolationAndReconciliation.GetAllStudentsWithViolation,
      { params }
    );
  }

  getAllViolationRelatedToStudent(
    Id: number
  ): Observable<IApiResponse<IStudentViolationData>> {
    let params = new HttpParams().set('Id', Id);
    return this.httpClient.get<IApiResponse<IStudentViolationData>>(
      ApiLinks.Admin.ViolationAndReconciliation.GetAllViolationRelatedToStudent,
      { params }
    );
  }
}
