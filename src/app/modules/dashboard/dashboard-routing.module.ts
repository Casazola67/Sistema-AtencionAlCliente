import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        { path: 'organizations', component: AdminOrganizationComponent},
        { path: 'users', component: AdminUserComponent },
        { path: 'ticket', component: TicketComponent},
        { path: 'admin-org', component: AdminComponent},
        { path: 'admin-ticket', component: AdminTicketComponent},
        { path: 'request', component: RequestComponent},
        { path: 'edit-org', component: EditOrganizationComponent},
        { path: 'edit-profile', component: EditProfileComponent},    
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class DashboardRoutingModule { }
  