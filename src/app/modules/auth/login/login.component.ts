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

  validator: boolean = false;

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

  public validate(){
    if(this.email == '' || this.password == ''){
    this.validator = false;
    }else{
      this.validator = true;
    }
  }

  login(){
    const email = this.email;
    const password = this.password;
    this.authService.SignIn(email, password).pipe()
    .subscribe(() => {
      if(this.authService.isLoggedIn()){
        this.router.navigate(['/dashboard']);
      }
      else(window.alert('Ingrese un correo electrónico o contraseña válida'))
    });
  }
  
}
