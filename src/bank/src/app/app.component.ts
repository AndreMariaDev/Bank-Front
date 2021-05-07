import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QueryOptions } from './base/query-options';
import { UserService } from './feature/user/user-service';
import { enumTypeUser, UserView } from './models/user-view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  admin!:boolean
  userView!:UserView;
  name:String ='';
  codeUserLog!:String;
  constructor(private appService: UserService,public router: Router){
    let codeUser = sessionStorage.getItem('UserCode');
    this.admin = false;
    if(!codeUser){
      this.router.navigateByUrl('/login');
    }
    else{
      console.log(codeUser);
      this.codeUserLog = codeUser; 
      this.onUserView(codeUser);
      this.appService.findGenericAsync(
        new QueryOptions([{ key: 'code', values: codeUser }]),
        "User/GetByCodeAsync")
      .subscribe(response=>{
          debugger;
          this.userView = (response as UserView);
          this.name = this.userView.name;
          this.admin = this.userView.typeUser == enumTypeUser.Admin
          sessionStorage.setItem('UserAdmin',String(this.admin));
        },error=>{
          console.log(error.Message);
      });
      console.log(`Admin:${this.admin}`);
    }

  }
  onUserView(codeUser:any){
    this.appService.findGenericAsync(new QueryOptions([{ key: 'code', values: codeUser }]),"User/GetByCodeAsync")
    .subscribe(response=>{
        let userView = (response as UserView);
        sessionStorage.setItem('UserView',JSON.stringify(userView));
        
      },error=>{
        console.log(error.Message);
    });
  }

  onLogout(){
    let codeUser = sessionStorage.clear();
    this.name = '';
    this.codeUserLog;
    sessionStorage.clear();
    this.reloadComponent();
    this.router.navigateByUrl('/login');
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
