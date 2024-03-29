import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';



@NgModule({
    declarations: [
      LoginComponent,
      RegisterComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      AuthRoutingModule,
    ]
  })
  export class AuthModule { }
  