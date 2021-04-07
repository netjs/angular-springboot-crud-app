import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './users/adduser/adduser.component';
import { AllUsersComponent } from './users/allusers/allusers.component';
import { DeleteUserComponent } from './users/deleteuser/deleteuser.component';

const routes: Routes = [
  {path: 'adduser', component: AddUserComponent},
  {path: 'deleteuser', component: DeleteUserComponent},
  {path: 'displayusers', component: AllUsersComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
})
export class AppRoutingModule { }
