import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Patrimony } from '../../../models/patrimony';
import { PatrimonyService } from '../patrimony-service';
import { ListBase } from '../../../base/list-base';
import { QueryOptions, Parameters } from '../../../base/query-options';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListBase<Patrimony> {

  displayColumnsSubTable = Array<String>();
  
  constructor(appService: PatrimonyService,public router: Router) {
    super(appService,["Branch","Account Number","Balance","SummarizedEquity","UserCode","Name"],false)
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }
    else{
      this.onGetPatrimony(codeUser);
    }
   }

  ngOnInit(): void {
    
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }
    else{
      this.onGetPatrimony(codeUser);
    }
  }

  onGetPatrimony(codeUser:string):void{
    let filter = new Array<Parameters>();
    filter.push({ key: 'codeUser', values: (codeUser)});
    this.appService.findAsync(new QueryOptions(filter))
    .subscribe( response =>{
      this.displayColumnsSubTable = new Array<String>();
      this.displayColumnsSubTable.push('addedStockMarket');		
      this.displayColumnsSubTable.push('amount');					
      this.displayColumnsSubTable.push('value');					
      this.displayColumnsSubTable.push('create');					
      this.displayColumnsSubTable.push('isActive');		
        this.data = response;
        console.log(response);
    },
    error=>{
        console.log(error.message);
    });
  }
}
