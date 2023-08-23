import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path : '', component: RegisterComponent},
  { path : 'login', component: LoginComponent},
  { path : 'admin/home', component: TodoComponent, canActivate : [authGuard]},
  { path : 'client/home', component: TodoComponent, canActivate : [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
