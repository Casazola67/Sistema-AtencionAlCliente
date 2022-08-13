import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: '', component: OrganizationComponent},
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class DashboardRoutingModule { }
  