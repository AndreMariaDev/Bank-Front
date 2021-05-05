  
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DomainEntity } from './domain-entity';
import { ServiceBase } from './service-base';
import { Parameters, QueryOptions } from './query-options';


export class ListBase<T extends DomainEntity>{

    data = Array<T>();
    par = Array<Parameters>();
    displayColumns: Array<string>;
    //listDeleteItem: Array<string>;
    constructor(
        public appService: ServiceBase<T>,
        displayColumns: Array<string>,
        getall:boolean
    ){
        debugger;
        if(getall){
            this.par.push({ key: '_offset', values: ('1')});
            this.par.push({ key: '_limit', values: ('100000')});
        }
        this.displayColumns = displayColumns;
    }

    onGetAll():void{
        this.appService.findAsync(new QueryOptions(this.par))
        .subscribe( response =>{
            this.data = response;
            console.log(response);
        },
        error=>{
            console.log(error.message);
        });
    }

    onGetByFilter():void{
        this.par.push({ key: '_offset', values: (Object('1'))});
        this.par.push({ key: '_limit', values: (Object('100000'))});
        this.appService.findAsync(new QueryOptions(this.par))
        .subscribe( response =>{
            this.data = response;
        },
        error=>{
            console.log(error.message);
        });
    }
}