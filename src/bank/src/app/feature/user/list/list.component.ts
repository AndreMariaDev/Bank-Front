import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../user-service';
import { ListBase } from '../../../base/list-base';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListBase<User> {

  constructor(appService: UserService,public router: Router) {
    super(appService,["code","name","email","phone","create","isActive"],true)
    let codeUser = sessionStorage.getItem('UserCode');
    // if(!codeUser){
    //   this.router.navigateByUrl('/login');
    // }
   }

  ngOnInit(): void {
    this.onGetAll();
  }

}
