import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { AdminApiUrls } from 'src/app/Constant/ApiUrls';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { IGetAllTermAndConditionResponse } from 'src/app/Models/Responses/iterm-and-condition-response';

@Injectable({
  providedIn: 'root',
})
export class TermAndConditionService {
  constructor(private httpClient: HttpClient) {}

  createTermsAndConditions(data: any): Observable<IApiResponse<any>> {
    return this.httpClient.post<IApiResponse<any>>(
      AdminApiUrls.CreateTermsAndConditions,
      data
    );
  }
  getTermsAndConditionsById(id: number): Observable<IApiResponse<any>> {
    let params = new HttpParams().set('Id', id);
    return this.httpClient.get<IApiResponse<any>>(
      ApiLinks.Admin.TermsAndConditions.GetById,
      {
        params,
      }
    );
  }
  // get All Terms And Conditions
  getAllTermsAndConditions(): Observable<
    IApiPaginateResponse<IGetAllTermAndConditionResponse[]>
  > {
    let params = new HttpParams()
      .set('PageNumber', 1)
      .set('PageSize', 100)
      .set('Search', '');
    return this.httpClient.get<
      IApiPaginateResponse<IGetAllTermAndConditionResponse[]>
    >(ApiLinks.Admin.TermsAndConditions.GetAll, {
      params,
    });
  }

  updateTermsAndConditions(data: any): Observable<IApiResponse<any>> {
    return this.httpClient.put<IApiResponse<any>>(
      ApiLinks.Admin.TermsAndConditions.Update,
      data
    );
  }

  deleteTermsAndConditionsById(id: number): Observable<IApiResponse<any>> {
    let params = new HttpParams().set('Id', id);
    return this.httpClient.delete<IApiResponse<any>>(
      ApiLinks.Admin.TermsAndConditions.Delete,
      {
        params,
      }
    );
  }
}
