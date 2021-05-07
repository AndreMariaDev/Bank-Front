import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { enumTypeUser, User } from '../../../models/user';
import { UserService } from '../user-service';
import { ListBase } from '../../../base/list-base';
import { QueryOptions } from 'src/app/base/query-options';
import { UserView } from 'src/app/models/user-view';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListBase<User> {

  constructor(appService: UserService,public router: Router) {
    super(appService,["code","name","email","phone","create","isActive"],true)
    this.ongetUser();
   }

  ngOnInit(): void {
    this.ongetUser();
  }

  ongetUser(){
    let codeUser = sessionStorage.getItem('UserCode');
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }
    else{
      this.appService.findGenericAsync(new QueryOptions([{ key: 'codeUser', values: codeUser }]),"User/GetListUserByCode")
      .subscribe(response=>{
          this.data = (response as User[]);
        },error=>{
          console.log(error.Message);
      });
    }
  }

}
