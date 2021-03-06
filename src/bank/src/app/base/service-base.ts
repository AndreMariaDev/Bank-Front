import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventEmitter } from '@angular/core'

import { DomainEntity, DomainEntityT } from './domain-entity';
import { QueryOptions } from './query-options';
import { Serializer,SerializerT } from './serializer';
import { Base } from './base';

export interface BaseOptionsBanck{
    headers: any;
    body: any;
}

export interface AuthenticateResponse {
    code: string;
    name: string;
    login: string;
    email: string;
    token: string;
}

export class ServiceBase<T extends DomainEntity| DomainEntityT> extends Base{

    eventEmitter = new EventEmitter<T>();
    readonly options: BaseOptionsBanck = {
        headers:new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
        }),
        body: {}
    };

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private endpoint: string,
        private serializer: Serializer | SerializerT,     
    ){
        super();
    }

    public getByCodeAsync(code: string):Observable<T>
    {
        return this.httpClient
        .get<T>(`${this.url}/${this.endpoint}/${code}`)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        )
    }

    public findAsync(queryOptions:QueryOptions):Observable<T[]>
    {
        
        console.log(`Bearer ${sessionStorage.getItem('auth_token')}`);
        
        return this.httpClient
        .get<T>(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`,this.options)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        )
    }

    public findByEndpointAsync(endpoint:string,queryOptions:QueryOptions):Observable<T[]>
    {
        console.log(`Bearer ${sessionStorage.getItem('auth_token')}`);
        
        return this.httpClient
        .get<T>(`${this.url}/${endpoint}?${queryOptions.toQueryString()}`,this.options)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        )
    }

    public findGenericAsync(queryOptions:QueryOptions,endpoint:string):Observable<any>
    {
        console.log(`Bearer ${sessionStorage.getItem('auth_token')}`);
        
        return this.httpClient
        .get<any>(`${this.url}/${endpoint}?${queryOptions.toQueryString()}`,this.options)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        )
    }

    public findGenericAllAsync(endpoint:string):Observable<any>
    {
        console.log(`Bearer ${sessionStorage.getItem('auth_token')}`);
        
        return this.httpClient
        .get<any>(`${this.url}/${endpoint}`,this.options)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        )
    }

    public Create(entity:T)
    {
        
        console.log(`Bearer ${sessionStorage.getItem('auth_token')}`);
        return this.httpClient
        .post<T>(`${this.url}/${this.endpoint}`,this.serializer.toJson(entity),this.options)
        .pipe(map((data:any)=> this.serializer.fromJson(data) as T));
    }

    public Update<T extends DomainEntity>(entity:T )
    {
        return this.httpClient
        .put<T>(`${this.url}/${this.endpoint}/${entity.code}`,this.serializer.toJson(entity))
        .pipe(map((data:any)=> this.serializer.fromJson(data) as T));
    }

    public DeleteLogic(code: string,codeUser: string)
    {
        return this.httpClient
        .delete<T>(`${this.url}/${this.endpoint}/${code}/${codeUser}`)
        .pipe(map((data:any)=> this.serializer.fromJson(data) as T));
    }
}

