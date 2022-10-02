import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminOrganizationComponent } from './admin-organization/admin-organization.component';
import { TicketComponent } from './ticket/ticket.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTicketComponent, AdminTicketDialog } from './admin-ticket/admin-ticket.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [
        AdminComponent,
        AdminOrganizationComponent,   
        AdminUserComponent, 
        AdminTicketComponent,
        AdminTicketDialog,
        DashboardComponent,
        HomeComponent,
        NavbarComponent,
        TicketComponent,
    ], 
    imports: [
        CommonModule,
        ClipboardModule,
        DashboardRoutingModule, 
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatDividerModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule, 
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        NgbModule,
    ]
})

export class DashboardModule {}