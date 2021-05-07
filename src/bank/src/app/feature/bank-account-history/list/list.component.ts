import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { BankAccountHistoryService } from '../bank-account-history-service';
import { BankAccountService } from '../../banck-account/bank-account-service';
import { ListBase } from '../../../base/list-base';
import { BankAccountHistory } from '../../../models/bank-account-history';
import { QueryOptions } from 'src/app/base/query-options';
import { BankBalance } from 'src/app/models/bank-balance';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListBase<BankAccountHistory> {

  public acount!:string;
  public brand!:string;
  constructor(private appbankAccountHistoryService: BankAccountHistoryService,private appBankAccountService:BankAccountService,public router: Router) {
    super(appbankAccountHistoryService,["Type Moving","Amount Moved","Moving Date"],true)
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }

    this.getBalance(codeUser);
    appBankAccountService.findGenericAsync(new QueryOptions([{key:"codeUser",values:codeUser}]),"BankAccount/GetBankAccountByUser")
    .subscribe(response=>{
      let bankBalance = (response as BankBalance[]);
      this.acount = bankBalance[0].accountNumber;;
      this.brand = bankBalance[0].branch;
    },error=>{

    });

    console.log(this.data);
  }

  ngOnInit(): void {
  }

  getBalance(codeUser:any){
    this.appbankAccountHistoryService.findByEndpointAsync(
      "BankAccountHistory/GetBankAccountHistoryByUser",
      new QueryOptions([{key:'codeUser',values:codeUser}]))
    .subscribe(response=>{
      this.data = (response as BankAccountHistory[])
    },error=>{
      console.log(error.Message);
    })
  }

}
