import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Assets, enumStockMarket } from '../../../models/asset';
import { AssetService } from '../asset-service';
import { CreateBase } from '../../../base/create-base';
import { QueryService } from '../../../base/query-service';
import { QueryOptions,Parameters } from '../../../base/query-options';
import { Guid } from 'src/app/base/create-guid';
import { BankBalance } from '../../../models/bank-balance';
import { TopListService } from '../top-list-service';
import { Traded } from 'src/app/models/traded';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends CreateBase<Assets> {

  disabledView = false;
  enumKeys = new Array<Parameters>();
  bankBalance!:BankBalance;
  amountBankBalance!:number;

  constructor(
      appService: AssetService,
      private appQueryService: QueryService,
      formBuilder : FormBuilder, 
      public router: Router,
      private topListService:TopListService
      ) {
    super(appService,formBuilder,router);

    let codeUser = sessionStorage.getItem('UserCode');
    codeUser?this.onBankBalance(codeUser):this.router.navigateByUrl('/login');
    this.onLoadFormGroup();
    
    this.onSelectItens();
  }
  

  onBankBalance(codeUser:string){
    this.appQueryService.GetFirstByFilter<BankBalance>('BankAccount/GetAmountInAccount',new QueryOptions([{ key: 'codeUser', values: codeUser }]))
      .subscribe(response=>{
        if(response){
            
            this.bankBalance = (response as BankBalance)
            this.amountBankBalance = this.bankBalance.amount;
          }
        },error=>{
          console.log(error.Message);
        });
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

    this.formGroup.addControl('addedStockMarket',new FormControl(this.entity.addedStockMarket, Validators.required));
    this.formGroup.addControl('amount',new FormControl(this.entity.amount, Validators.required));
    this.formGroup.addControl('value',new FormControl(this.entity.value, Validators.required));
    this.formGroup.addControl('code',new FormControl(this.entity.code));
    this.formGroup.addControl('isActive',new FormControl(this.entity.isActive, Validators.required));
    this.formGroup.addControl('create',new FormControl(this.entity.create, Validators.required));
    this.formGroup.addControl('userCreate',new FormControl(this.entity.userCreate));
    this.formGroup.addControl('userCode',new FormControl(this.entity.userCode));
    console.log(this.formGroup);
  }

  onSelectItens(){
    this.topListService.findGenericAsync(new QueryOptions([{ key: '_offset', values: ('1')}, { key: '_limit', values: ('100000')}]),"Traded").subscribe(response=>{
      debugger;
      let list = (response as Traded[]);
      list.forEach(element => {
        this.enumKeys.push({key: element.addedStockMarket,values: element.value});
      });
    },error=>{
      debugger;
      console.log(error);
    })
  }

  btnCancel(){
    this.router.navigateByUrl('/user');
  }

  onBlurAmout(event:any){
    debugger;
    let valueAsset = Number(event.target.value);
    if(valueAsset <= 0){
      valueAsset = 1;
      event.target.value = 1;
    }
    this.enumKeys
    if(this.formGroup.controls['value'].value){
      let stock = this.formGroup.controls['addedStockMarket'].value;
      let list = this.enumKeys.filter(x=> x.key === stock);
      let value = list[0].values;
      this.formGroup.controls['value'].setValue(Number(value)*valueAsset);
      this.entity.value = this.formGroup.controls['value'].value;
    }else{
      let stock = this.formGroup.controls['addedStockMarket'].value;
      let list = this.enumKeys.filter(x=> x.key === stock);
      let value = list[0].values;
      this.formGroup.controls['value'].setValue(Number(value)*valueAsset);
      this.entity.value = this.formGroup.controls['value'].value;
    }

    let result = this.formGroup.controls['value'].value;
    let sum = this.amountBankBalance - result;
    if(sum > 0){
      this.bankBalance.amount = this.amountBankBalance - result;
    }else{
      this.bankBalance.amount = this.amountBankBalance;
      event.target.value = 0;
    }
  }

  onBlurValue(event:any){
    
    let valueAsset = Number(event.target.value);
    let sum = this.amountBankBalance - valueAsset;
    if(sum > 0){
      this.bankBalance.amount = this.amountBankBalance - valueAsset;
      this.entity.value = valueAsset;
    }else{
      this.bankBalance.amount = this.amountBankBalance;
      event.target.value = 0;
      this.entity.value =0;
    }
  }
  
  onSaveAsset(){
    this.onSave();
    this.router.navigateByUrl('/assets');
  }
}
