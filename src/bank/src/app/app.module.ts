import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from '../app/feature/authentication/login/login.component';
import { CreateComponent as CreateUserComponent} from '../app/feature/user/create/create.component';
import { ListComponent as ListUserComponent } from '../app/feature/user/list/list.component';
import { CreateComponent as CreateAssetsComponent } from '../app/feature/asset/create/create.component';
import { ListComponent as ListAssetsComponent } from '../app/feature/asset/list/list.component';
import { ListComponent as ListPatrimonyComponent } from '../app/feature/patrimony/list/list.component';
import { CreateComponent as CreateBankComponent } from '../app/feature/banck-account/create/create.component';
import { ListComponent as ListAccountComponent } from '../app/feature/banck-account/list/list.component';
import { MessageComponent } from './feature/modal/message/message.component';
import { ErrorComponent } from './feature/modal/error/error.component';
import { ListComponent } from './feature/bank-account-history/list/list.component';
import { TopListComponent } from './feature/asset/top-list/top-list.component';
import { DepositComponent } from './feature/banck-account/deposit/deposit.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ListUserComponent,
    CreateAssetsComponent,
    ListAssetsComponent,
    ListPatrimonyComponent,
    CreateBankComponent,
    LoginComponent,
    MessageComponent,
    ErrorComponent,
    ListComponent,
    TopListComponent,
    ListAccountComponent,
    DepositComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    BsDropdownModule.forRoot(),		
    TooltipModule.forRoot(),	
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [AlertConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
