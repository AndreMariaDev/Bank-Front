import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { Patrimony, PatrimonySerializer } from '../../models/patrimony';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatrimonyService extends ServiceBase<Patrimony> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'Patrimony', new PatrimonySerializer());
  }
}