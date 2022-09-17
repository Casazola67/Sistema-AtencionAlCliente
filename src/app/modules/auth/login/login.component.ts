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
  userSigned = new Subscription();

  constructor( public authService : AuthService, public router: Router, ) {}

  ngOnInit(){
    this.userSigned = this.authService.userSigned.subscribe(() => 
    this.goToDashboard()
    );
  }
  ngOnDestroy(){
    this.userSigned.unsubscribe();
  }

  private goToDashboard(){
    this.router.navigate(["/dashboard"]);
  }


  login(){
    const email = this.email;
    const password = this.password;
    this.authService.SignIn(email, password).pipe()
    .subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  
}
