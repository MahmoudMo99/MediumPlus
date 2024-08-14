import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IApiResponse } from '../Models/Base/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {}

  // get all countries
  getAllCountries(): Observable<IApiResponse<[]>> {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 100);
    return this.httpClient.get<IApiResponse<[]>>(
      environment.apiUrl + 'Country',
      {
        params,
      }
    );
  }

  // get all governorates for country
  getAllGovernoratesForCountry(
    countryId: number
  ): Observable<IApiResponse<[]>> {
    let params = new HttpParams()
      .set('PageNumber', 1)
      .set('PageSize', 100)
      .set('CountryId', countryId);
    return this.httpClient.get<IApiResponse<[]>>(
      environment.apiUrl + 'Governorate/GetAllGovernoratesInCountry',
      { params }
    );
  }

  // get all cities for governorate
  getAllCitiesForGovernorate(
    GovernorateId: number
  ): Observable<IApiResponse<[]>> {
    let params = new HttpParams()
      .set('PageNumber', 1)
      .set('PageSize', 100)
      .set('GovernorateId', GovernorateId);
    return this.httpClient.get<IApiResponse<[]>>(
      environment.apiUrl + 'City/GetAllCitysInGovernorate',
      { params }
    );
  }

  // get all villages for city

  getAllVillagesforCity(CityId: number): Observable<IApiResponse<[]>> {
    let params = new HttpParams()
      .set('PageNumber', 1)
      .set('PageSize', 100)
      .set('CityId', CityId);
    return this.httpClient.get<IApiResponse<[]>>(
      environment.apiUrl + 'Village/GetAllVillagesInCity',
      { params }
    );
  }
}
