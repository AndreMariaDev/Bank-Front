import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { UserCredentials, UserCredentialsSerializer } from '../../models/user-credentials';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService extends ServiceBase<UserCredentials> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'UserCredentials', new UserCredentialsSerializer());
  }
}