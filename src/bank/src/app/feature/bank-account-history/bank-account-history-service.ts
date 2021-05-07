
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { BankAccountHistory, BankAccountSerializer } from '../../models/bank-account-history';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountHistoryService extends ServiceBase<BankAccountHistory> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'BankAccountHistory', new BankAccountSerializer());
  }
}

