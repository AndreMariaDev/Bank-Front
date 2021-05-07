  
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DomainEntity } from './domain-entity';
import { ServiceBase } from './service-base';
import { Guid } from './create-guid';
import { stringify } from '@angular/compiler/src/util';
import { QueryOptions,Parameters } from '../base/query-options';

export interface FormFields{
    name:string,
    required?: Validators,
    newFormGroup?: boolean
}

export class UpdateBase<T extends DomainEntity>{
    par:Array<Parameters> = new Array<Parameters>();
    formGroup: FormGroup;
    entity: T;
    constructor(
        private appService: ServiceBase<T>,
        public formBuilder: FormBuilder,
        public router: Router,
        entityT: (new ()=> T),
        formFields: FormFields[],
        endpoint:string
    ){
        this.entity = new entityT(); 
        this.formGroup = this.formBuilder.group({ });
        let newFormArray = formFields.filter(f=> f.newFormGroup);
        
        if (newFormArray.length >0) {
            let newformBuilder = new FormBuilder().group({});
            let name: string = '';
            newFormArray.map((element)=>{
                if(element.name.toString().indexOf('@') !== -1){
                    name = element.name.toString().substring(0,element.name.length-1);
                }else{
                    newformBuilder.addControl(element.name.toString(),new FormControl('',element.required));
                }
            });

            this.formGroup.addControl(name,newformBuilder);

            formFields.map((element)=>{
                this.formGroup.addControl(element.name.toString(),new FormControl('',element.required));
            });
        } else {
            let codeUser = sessionStorage.getItem('UserCode');
            if(!codeUser){
              this.router.navigateByUrl('/login');
            }else{
              this.par.push({ key: 'codeUser', values: codeUser });
              appService.findByEndpointAsync(endpoint,new QueryOptions(this.par)).subscribe(response=>{
                if(response){
                  
                  let itens = response as T[];
                  this.entity = itens[0];

                    formFields.map((element)=>{
                        console.log(`name:${element.name.toString()}`);
                        console.log(`value:${Reflect.get(this.entity,element.name.toString())}`)
                        this.formGroup.addControl(element.name.toString(),new FormControl(Reflect.get(this.entity,element.name.toString()),element.required));
                    });
                    console.log(this.formGroup);
                }
                else{
    
                }
              },error=>{})
            }
        }
    }

    async getItens(code: string){
        await this.appService.getByCodeAsync(code)
        .subscribe(response=>{
            response === null ? console.log(`Atenção: Dados referentes ao Code:${code} não foram encontrados!`) : this.entity = response;
        },error=>{
            console.log(`Error: Dados referentes ao Code:${code} não foram encontrados!; Error:${error.Message}`);
        });
    }

    onSave():void{
        if(this.formGroup.invalid){
            console.log(`Itens Invalid:${this.entity}`);
        }
        else{
            this.appService.Update(this.entity)
            .subscribe( response=>{
                console.log(response);
            },
            error=>{
                console.log(error.message);
            })
        }
    }
}