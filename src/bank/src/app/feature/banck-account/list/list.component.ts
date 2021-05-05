import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { enumCredentialsType, UserCredentials } from '../../../models/user-credentials';
import { UserService } from '../../user/user-service';
import { CreateBase } from '../../../base/create-base';
import { QueryOptions,Parameters } from '../../../base/query-options';
import { Guid } from 'src/app/base/create-guid';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends CreateBase<User> {

  disabledView = false;
  enumKeys = new Array<Parameters>();
  enumCredType!: enumCredentialsType;

  constructor(appService: UserService,formBuilder : FormBuilder, public router: Router) {
    super(appService,formBuilder,router,User);

    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }

    this.onLoadFormGroup();
    this.onSelectItens();
  }
  
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  onLoadFormGroup():void{
    debugger;
    var guidNew = new Guid();
    
    let codeUser = sessionStorage.getItem('UserCode');
    if(codeUser){
      this.entity.userCreate = codeUser;
    }

    this.entity.userCredentialsItens = new Array<UserCredentials>();
    var cred = new UserCredentials();
    cred.code = guidNew.uuid();
    cred.userCode = guidNew.uuid();
    cred.isActive = true;
    cred.create = (new Date).toDateString() 
    cred.userCreate = guidNew.uuid();
    if(codeUser){
      cred.userCreate = codeUser;
    }


    Object.keys(this.entity)
    .map(key =>{
      debugger;
      if(key === 'update' || key === 'update'){
        this.formGroup.addControl(key,new FormControl(Reflect.get(this.entity,key)));
      }else{
        this.formGroup.addControl(key,new FormControl(Reflect.get(this.entity,key), Validators.required));
      }    
    })


    this.entity.userCredentialsItens.push(cred);
    this.formGroup.addControl('name',new FormControl(this.entity.name, Validators.required));
    this.formGroup.addControl('email',new FormControl(this.entity.email, Validators.required));
    this.formGroup.addControl('phone',new FormControl(this.entity.phone, Validators.required));
    this.formGroup.addControl('code',new FormControl(this.entity.code));
    this.formGroup.addControl('isActive',new FormControl(this.entity.isActive, Validators.required));
    this.formGroup.addControl('create',new FormControl(this.entity.create, Validators.required));
    this.formGroup.addControl('userCreate',new FormControl(this.entity.userCreate));

    this.formGroup.addControl('userCredentialsItens',new FormGroup({
      'login': new FormControl(this.entity.userCredentialsItens[0].login,Validators.required),
      'password': new FormControl(this.entity.userCredentialsItens[0].password),
      'credentialsType': new FormControl(this.entity.userCredentialsItens[0].credentialsType,Validators.required),
      'userCode': new FormControl(this.entity.userCredentialsItens[0].userCode,Validators.required),
      'code': new FormControl(this.entity.userCredentialsItens[0].code,Validators.required),
      'isActive': new FormControl(this.entity.userCredentialsItens[0].isActive,Validators.required),
      'create': new FormControl(this.entity.userCredentialsItens[0].create,Validators.required),
      'userCreate': new FormControl(this.entity.userCredentialsItens[0].userCreate,Validators.required),
    }));
    debugger;
    console.log(this.formGroup);
  }

  onSelectItens(){
    let listKey = new Array<string>();
    let listValues =new Array<object>();
    Object.keys(enumCredentialsType).forEach(element => {
      if(!isNaN(Number(element))){
        listKey.push(element);
      }
      else{
        listValues.push(Object(element));
      }
    });

    for (let index = 0; index < listKey.length; index++) {
      let item = new Parameters();
      item.key = listKey[index];
      item.values = listValues[index];
      this.enumKeys.push(item);
    }    
  }

  onChangeCredential(){
    debugger;
    console.log(this.formGroup);
    console.log(this.formGroup.invalid);
  }

  btnCancel(){
    this.router.navigateByUrl('/user');
  }

}
