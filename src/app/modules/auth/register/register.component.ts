import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { User } from 'src/app/core/models/user.model';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  name: string = '';

  constructor( public authService : AuthService, private userService: UserService, public router: Router )  {}
   
  ngOnInit(){
    if(this.authService.LoggedIn){
      this.goToDashboard();
    }
  }

  public register() {
    const email = this.email;
    const name = this.name;
    this.authService.signUp(this.email, this.password)
    .pipe(
      switchMap(({ user:{uid} }) =>
      this.userService.addUser({uid, email, name})
      ))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
    /*this.userService.createUser(this.user).then(() => {
      console.log('User registered')
    }, error => {
      console.log(error);
    });
    */
  }

  private goToDashboard(){
    this.router.navigate(["/dashboard"]);
  }

}
