import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = ""; 

  constructor( public authService : AuthService, public router: Router, ) {}

  ngOnInit(){
    if(this.authService.LoggedIn){
      this.goToDashboard();
    }
  }

  login(){
    this.authService.SignIn(this.email, this.password);
  }

  private goToDashboard(){
    this.router.navigate(["/dashboard"]);
  }

}
