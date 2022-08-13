import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

const routes: Routes = [
  { path: '',  component: LoginComponent, pathMatch: 'full'},
  { 
    path: 'dashboard',
    canActivate: [AuthGuard], 
    loadChildren: () => DashboardRoutingModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
