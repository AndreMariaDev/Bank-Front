import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BankAccountService } from '../bank-account-service';
import { ListBase } from '../../../base/list-base';
import { BankAccount } from 'src/app/models/bank-account';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListBase<BankAccount> {

  constructor(appService: BankAccountService,public router: Router) {
    super(appService,[
      'Code'
    ,'AccountNumber'
    ,'Branch'
    ,'Document'
    ,'TypeAccount'
    ,'Amount'
    ,'Limit'
    ,'IsActive'],true)
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.onGetAll();
  }
}