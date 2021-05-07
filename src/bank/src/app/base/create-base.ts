  
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DomainEntity } from './domain-entity';
import { ServiceBase } from './service-base';
import { Guid } from './create-guid';

export class CreateBase<T extends DomainEntity>{

    formGroup: FormGroup;
    entity: T;
    constructor(
        private appService: ServiceBase<T>,
        public formBuilder: FormBuilder,
        public router: Router
    ){
        this.entity = {} as T; 
        var guid = new Guid();
        let codeUser = sessionStorage.getItem('UserCode');
        this.formGroup = this.formBuilder.group({
                code: [guid.uuid()],
                isActive: [true],
                create: [new Date()],
                userCreate: [codeUser],
                update: [new Date()],
                userUpdate: [codeUser]
                // userCreate: sessionStorage.getItem('userCode')
            }
        );
    }

    onSave():void{
        if(this.formGroup.invalid){
            console.log(`Itens Invalid`);
        }
        else{
            console.log(JSON.stringify(this.formGroup.value))
            let requestItem = (this.formGroup.value as T);
            console.log(JSON.stringify(requestItem))
            this.appService.Create(requestItem)
            .subscribe( response=>{ 
                
                console.log(response);
            },
            error=>{
                debugger;
                // if(error.status == 401){
                //     sessionStorage.setItem('UserCode','');
                //     this.router.navigateByUrl('/login');
                // }
                console.log(error.message);
            })
        }
    }
}