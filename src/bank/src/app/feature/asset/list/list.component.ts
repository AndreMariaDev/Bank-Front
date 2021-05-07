import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Assets, } from '../../../models/asset';
import { AssetService } from '../asset-service';
import { ListBase } from '../../../base/list-base';
import { QueryOptions } from 'src/app/base/query-options';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListBase<Assets> {
  _appService!: AssetService
  constructor(appService: AssetService,public router: Router) {
    super(appService,["Code","Stock Market","Amount","Value","Create","Is Active"],true)
    this._appService = appService;
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }else{
      this._appService.findAsync(new QueryOptions([{ key: '_offset', values: ('1')},{ key: '_limit', values: ('100000')}]))
      .subscribe(response=>{
        var list = response as Assets[];
        this.data = list.filter(x=> x.userCode == codeUser);
      },error=>{
        console.log(error.Message);
      })
    }
  }

  ngOnInit(): void {
    //this.onGetAll();
  }
}
