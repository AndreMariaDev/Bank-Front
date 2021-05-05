import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Assets, } from '../../../models/asset';
import { AssetService } from '../asset-service';
import { ListBase } from '../../../base/list-base';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListBase<Assets> {

  constructor(appService: AssetService,public router: Router) {
    super(appService,["Code","Stock Market","Amount","Value","Create","Is Active"],true)
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.onGetAll();
  }
}
