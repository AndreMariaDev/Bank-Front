import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBase } from '../../base/service-base';
import { Assets, AssetsSerializer } from '../../models/asset';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService extends ServiceBase<Assets> {
  constructor(httpClient: HttpClient) {
    super(httpClient,
      environment.serverUrl,
      'Assets', new AssetsSerializer());
  }
}