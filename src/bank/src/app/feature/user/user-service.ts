import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { User, UserSerializer } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceBase<User> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'User', new UserSerializer());
  }
}