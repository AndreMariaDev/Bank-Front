import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { Traded, TradedSerializer} from '../../models/traded';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopListService extends ServiceBase<Traded> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'Traded',new TradedSerializer());
  }
}