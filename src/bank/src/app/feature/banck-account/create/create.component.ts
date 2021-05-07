import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BankAccount,BankAccountSerializer, enumTypeAccount } from '../../../models/bank-account';
import { BankAccountService } from '../../banck-account/bank-account-service';
import { CreateBase } from '../../../base/create-base';
import { QueryOptions,Parameters } from '../../../base/query-options';
import { Guid } from 'src/app/base/create-guid';
import { BankBalance } from '../../../models/bank-balance';
import { UserBank } from 'src/app/models/user-bank';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends CreateBase<BankAccount> {

  par:Array<Parameters> = new Array<Parameters>();
  disabledView = false;
  enumKeys = new Array<Parameters>();
  appServiceBank!:BankAccountService;
  listUser!:UserBank[];

  constructor(appService: BankAccountService,formBuilder : FormBuilder, public router: Router) {
    super(appService,formBuilder,router);
    this.appServiceBank = appService;
    let codeUser = sessionStorage.getItem('UserCode');
    // if(!codeUser){
    //   this.router.navigateByUrl('/login');
    // }else{
    //   this.router.navigateByUrl('/account/update');
    // }

    this.onGetUsers();
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

  onGetUsers(){
    this.appServiceBank.findGenericAllAsync('User/GetListUser').subscribe(response=>{
      this.listUser = (response as UserBank[]);
    },error=>{
      console.log(error.Message);
    })
  }
  onLoadFormGroup():void{
    
    var guidNew = new Guid();
    this.entity.code = guidNew.uuid();
    let codeUser = sessionStorage.getItem('UserCode');
    if(codeUser){
      this.entity.userCreate= codeUser;
      this.entity.create= [new Date()].toString();
      this.entity.userCode = codeUser
    }

    this.formGroup.addControl('accountNumber',new FormControl(this.entity.accountNumber, Validators.required));
    this.formGroup.addControl('branch',new FormControl(this.entity.branch, Validators.required));
    this.formGroup.addControl('document',new FormControl(this.entity.document, Validators.required));
    this.formGroup.addControl('typeAccount',new FormControl(this.entity.typeAccount, Validators.required));
    this.formGroup.addControl('amount',new FormControl(this.entity.amount, Validators.required));
    this.formGroup.addControl('limit',new FormControl(this.entity.limit, Validators.required));
    this.formGroup.addControl('hasLimit',new FormControl(this.entity.hasLimit, Validators.required));
    this.formGroup.addControl('code',new FormControl(this.entity.code));
    this.formGroup.addControl('isActive',new FormControl(this.entity.isActive, Validators.required));
    this.formGroup.addControl('create',new FormControl(this.entity.create, Validators.required));
    this.formGroup.addControl('userCreate',new FormControl(this.entity.userCreate));
    this.formGroup.addControl('userCode',new FormControl(this.entity.userCode));
    console.log(this.formGroup);
  }

  onSelectItens(){
    let listKey = new Array<string>();
    let listValues =new Array<object>();
    Object.keys(enumTypeAccount).forEach(element => {
      !isNaN(Number(element)) ? listKey.push(element) : listValues.push(Object(element));
    });

    for (let index = 0; index < listKey.length; index++) {
      this.enumKeys.push({ key: listKey[index], values: listValues[index]});
    }    
  }

  btnCancel(){
    this.router.navigateByUrl('/account/create');
  }

  onSaveAccount(){
    try {
      this.onSave();
      this.router.navigateByUrl('/account/list');
    } catch (error) {
      this.router.navigateByUrl('/account/list');
    }
  }

  onKeyDown(event:any){
    debugger;
    if(event.target.value.length == 11 && event.keyCode!=8){
      return false
    } 
    return true;
  }
}
