import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { TransactionHistoryResponse,TransactionHistorySerializer } from '../../models/transaction-history';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService extends ServiceBase<TransactionHistoryResponse> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'Transaction/RunTransaction', new TransactionHistorySerializer());
  }
}