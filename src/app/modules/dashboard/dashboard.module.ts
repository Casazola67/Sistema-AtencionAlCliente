import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization/organization.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        DashboardComponent,
        NavbarComponent,
        OrganizationComponent,   
        UserComponent, 
    ], 
    imports: [
        CommonModule,
        FormsModule,
        DashboardRoutingModule, 
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
    ]
})

export class DashboardModule {}