import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../app/feature/authentication/login/login.component';

import { CreateComponent as CreateUserComponent} from '../app/feature/user/create/create.component';
import { ListComponent as ListUserComponent } from '../app/feature/user/list/list.component';

import { CreateComponent as CreateAssetsComponent } from '../app/feature/asset/create/create.component';
import { ListComponent as ListAssetsComponent } from '../app/feature/asset/list/list.component';

import { ListComponent as ListPatrimonyComponent } from '../app/feature/patrimony/list/list.component';

import { CreateComponent as CreateBankComponent } from '../app/feature/banck-account/create/create.component';
//import { UpdateComponent as UpdateBankComponent } from '../app/feature/banck-account/update/update.component';
//import { BanckAccountComponent } from '../app/feature/banck-account/banck-account.component';

const routes: Routes = [
  { path:'assets/create', component: CreateAssetsComponent},
  { path:'assets', component: ListAssetsComponent},

  { path:'account/create', component: CreateBankComponent},
  //{ path:'account/update', component: UpdateBankComponent},

  //{ path:'account', component: BanckAccountComponent}

  { path:'login', component: LoginComponent},

  { path:'patrimony', component: ListPatrimonyComponent},

  { path:'user/create', component: CreateUserComponent},
  { path:'user', component: ListUserComponent},

  // 
  
    // { path:'user/update/:id', component: UpdateUserComponent,  resolve:{ entity: UserResolve }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
