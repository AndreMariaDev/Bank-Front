import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DomainEntity } from './domain-entity';
import { ServiceBase } from './service-base';

export class ResolveBase<T extends DomainEntity>{
    constructor(private appService: ServiceBase<T>){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<T>{
    return this.appService.getByCodeAsync(route.params['code']);
    }
}