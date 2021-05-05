
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { BankAccount, BankAccountSerializer } from '../../models/bank-account';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService extends ServiceBase<BankAccount> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'BankAccount', new BankAccountSerializer());
  }
}

