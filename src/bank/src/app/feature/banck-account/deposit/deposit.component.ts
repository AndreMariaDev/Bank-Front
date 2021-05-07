import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TransactionHistoryResponse } from '../../../models/transaction-history';
import { BankAccount } from '../../../models/bank-account';
import { TransactionHistoryService } from '../transaction-history-service';
import { BankAccountService } from '../bank-account-service';
import { QueryOptions,Parameters } from '../../../base/query-options';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  formGroup!: FormGroup;
  entity!: TransactionHistoryResponse;
  par:Array<Parameters> = new Array<Parameters>();

  constructor(private appService: TransactionHistoryService,private appAccountService: BankAccountService,private formBuilder : FormBuilder, public router: Router) {
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }
    this.entity = {
      event: '',
      targetBank: '',
      targetBranch: '',
      targetAccount: '',
      originBank: '',
      originBranch: '',
      originDocument: '',
      amount: 0,
      codeUser: '',
    };
    this.onLoadFormGroup();
   }

  ngOnInit(): void {
  }

  onLoadFormGroup():void{

    this.formGroup = this.formBuilder.group({});
    let codeUser = sessionStorage.getItem('UserCode');
    if(codeUser){
      this.entity.codeUser = codeUser
    }

    this.formGroup.addControl('event',new FormControl(this.entity.event, Validators.required));
    this.formGroup.addControl('targetBank',new FormControl(this.entity.targetBank, Validators.required));
    this.formGroup.addControl('targetBranch',new FormControl(this.entity.targetBranch, Validators.required));
    this.formGroup.addControl('targetAccount',new FormControl(this.entity.targetAccount, Validators.required));
    this.formGroup.addControl('originBank',new FormControl(this.entity.originBank, Validators.required));
    this.formGroup.addControl('originBranch',new FormControl(this.entity.originBranch, Validators.required));
    this.formGroup.addControl('originDocument',new FormControl(this.entity.originDocument, Validators.required));
    this.formGroup.addControl('amount',new FormControl(this.entity.amount));
    this.formGroup.addControl('codeUser',new FormControl(this.entity.codeUser, Validators.required));

    debugger;
    console.log(this.formGroup);
    this.onAccount();
  }

  onSave():void{
    if(this.formGroup.invalid){
        console.log(`Itens Invalid:${this.entity}`);
    }
    else{
        debugger;
        this.appService.Create(this.formGroup.value)
        .subscribe( response=>{
            debugger;
            console.log(response);
        },
        error=>{
            console.log(error.message);
        })
    }
  }
  onAccount(){
    this.par.push({ key: 'codeUser', values: this.entity.codeUser });
    this.appAccountService.findByEndpointAsync('BankAccount/GetBankAccountByUser',new QueryOptions(this.par)).subscribe(response=>{
      if(response){
        debugger;
        let itens = response as BankAccount[];
        let bankAccount: BankAccount = itens[0];
        this.entity.originBank = '352';
        this.entity.originBranch = `${bankAccount.branch}/ ${bankAccount.accountNumber}`;
        this.entity.originDocument =  bankAccount.document;

        this.formGroup.controls['originBank'].setValue(this.entity.originBank);
        this.formGroup.controls['originBranch'].setValue(this.entity.originBranch);
        this.formGroup.controls['originDocument'].setValue(this.entity.originDocument);
      }
      else{
        
      }
    },error=>{})
  }

  onSaveAccount(){
    this.onSave();
    this.router.navigateByUrl('/patrimony');
  }
}