import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdminOrganizationComponent } from './admin-organization/admin-organization.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { TicketComponent } from './ticket/ticket.component';
import { AdminTicketComponent } from './admin-ticket/admin-ticket.component';

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
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class DashboardRoutingModule { }
  