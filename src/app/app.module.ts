import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './modules/components/components.component';
import { OrganizationComponent } from './modules/components/organization/organization.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    OrganizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
