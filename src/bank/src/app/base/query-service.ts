import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { QueryOptions} from './query-options';
import { catchError, map } from 'rxjs/operators';
import { Base } from './base';

export interface BaseOptionsBank{
    headers: any;
    body: any;
}

@Injectable({
  providedIn: 'root'
})
export class QueryService extends Base {

  readonly options: BaseOptionsBank = {
      headers:new HttpHeaders({
          'Content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      }),
      body: {}
  };

  constructor(private httpClient: HttpClient) {
    super();
  }

  
  public GetByFilter<T>(endpoint:string,queryOptions:QueryOptions):Observable<T[]>
  {
      console.log(`Bearer ${sessionStorage.getItem('auth_token')}`);
      debugger;
      return this.httpClient
      .get<T>(`${environment.serverUrl}/${endpoint}?${queryOptions.toQueryString()}`,this.options)
      .pipe(
          map(super.extractData),
          catchError(super.serviceError)
       );
  }

  public GetFirstByFilter<T>(endpoint:string,queryOptions:QueryOptions):Observable<T>
  {
      console.log(`Bearer ${sessionStorage.getItem('auth_token')}`);
      debugger;
      return this.httpClient
      .get<T>(`${environment.serverUrl}/${endpoint}?${queryOptions.toQueryString()}`,this.options)
      .pipe(
          map(super.extractData),
          catchError(super.serviceError)
       );
  }
}