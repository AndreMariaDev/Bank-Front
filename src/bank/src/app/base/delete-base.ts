
  
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DomainEntity } from './domain-entity';
import { ServiceBase } from './service-base';
import { Guid } from './create-guid';

export interface ItemDelete{
    listCode:string[],
    codeUser: string
}

export class DeleteBase<T extends DomainEntity>{

    routeListString:string = '';
    constructor(
        private appService: ServiceBase<T>,
        public router: Router
    ){

    }

    onDeleteItens(itens:ItemDelete):void{
        itens.listCode.map((element)=>{
            this.appService.DeleteLogic(element,itens.codeUser)
            .subscribe( response=>{
                console.log(response);
            },
            error=>{
                console.log(error.message);
            }); 
        });
        this.router.navigateByUrl(this.routeListString);
    }
}