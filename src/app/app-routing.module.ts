import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard.service';
import { SecureInnerPagesGuard } from './core/services/secure-inner-pages-guard.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

const routes: Routes = [
  { path: '',  component: LoginComponent, canActivate:[SecureInnerPagesGuard],pathMatch: 'full'},
  { path: 'register',  component: RegisterComponent, canActivate:[SecureInnerPagesGuard]},
  { 
    path: 'dashboard',
    //canActivate: [AuthGuard], 
    loadChildren: () => DashboardRoutingModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
