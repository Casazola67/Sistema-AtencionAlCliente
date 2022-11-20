import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminGuard } from 'src/app/core/services/superadmin-guard.service';
import { AdminGuard } from 'src/app/core/services/admin-guard.service';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdminOrganizationComponent } from './admin-organization/admin-organization.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { TicketComponent } from './ticket/ticket.component';
import { AdminTicketComponent } from './admin-ticket/admin-ticket.component';
import { RequestComponent } from './request/request.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: '', component: HomeComponent},
        { path: 'organizations', component: AdminOrganizationComponent, canActivate:[SuperAdminGuard]},
        { path: 'users', component: AdminUserComponent, canActivate:[SuperAdminGuard] },
        { path: 'ticket', component: TicketComponent},
        { path: 'admin-org', component: AdminComponent, canActivate:[AdminGuard]},
        { path: 'admin-ticket', component: AdminTicketComponent, canActivate:[AdminGuard]},
        { path: 'request', component: RequestComponent, canActivate:[SuperAdminGuard]},
        { path: 'edit-org', component: EditOrganizationComponent, canActivate:[AdminGuard]},
        { path: 'edit-profile', component: EditProfileComponent},    
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class DashboardRoutingModule { }
  