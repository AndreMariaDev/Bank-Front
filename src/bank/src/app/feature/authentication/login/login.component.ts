import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../models/Login';
import { LoginService } from '../login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  formGroup!: FormGroup;
  login!: Login;
  constructor(private appService: LoginService, public formBuilder: FormBuilder,public router: Router) {
    this.login = {username:'',password:''};
    this.formGroup = this.formBuilder.group({
          username: [this.login.username,Validators.required],
          password: [this.login.password,Validators.required]
        }
    );
   }

   onLogin(){
    debugger;
    console.log(this.login);
    this.appService.Authenticate(this.formGroup.value).subscribe(response=>{
      if(response){
        debugger;
        sessionStorage.setItem('auth_token',response?.token);
        sessionStorage.setItem('UserCode',response?.code);
        this.router.navigate(['/user']);
      }
    },
    error=>{
      console.log(error.Message);
    })
  }
}
