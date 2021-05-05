import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from '../app/feature/authentication/login/login.component';
import { CreateComponent as CreateUserComponent} from '../app/feature/user/create/create.component';
import { ListComponent as ListUserComponent } from '../app/feature/user/list/list.component';
import { CreateComponent as CreateAssetsComponent } from '../app/feature/asset/create/create.component';
import { ListComponent as ListAssetsComponent } from '../app/feature/asset/list/list.component';
import { ListComponent as ListPatrimonyComponent } from '../app/feature/patrimony/list/list.component';
import { CreateComponent as CreateBankComponent } from '../app/feature/banck-account/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ListUserComponent,
    CreateAssetsComponent,
    ListAssetsComponent,
    ListPatrimonyComponent,
    CreateBankComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    // BsDropdownModule.forRoot(),		
    // TooltipModule.forRoot(),	
    // ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
