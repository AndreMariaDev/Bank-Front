import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthenticateResponse, ServiceBase } from '../../base/service-base';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class LoginService{
    constructor(private httpClient: HttpClient) {
    }

    public Authenticate(entity:any)
    {
        debugger;
        return this.httpClient
        .post<AuthenticateResponse>(`${environment.serverUrl}/${''}/authenticate`,entity)
        .pipe(map((data:any)=> {
            if(data){
                let item: AuthenticateResponse = {
                    code: data.code,
                    name: data.name,
                    login: data.login,
                    email: data.email,
                    token: data.token
                };
                return item;
            }
            return null;
        }));
    }
  }