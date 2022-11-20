import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

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
  displayName: string = '';
  
  validator: boolean = false;


  constructor( public authService : AuthService, private userService: UserService, public router: Router )  {}

  ngOnInit(){

  }

  public register() {
    const email = this.email;
    const displayName = this.displayName;
    this.authService.SignUp(this.email, this.password)
    .pipe(
      switchMap(({ user:{uid} }) =>
      this.userService.addUser({uid, email, displayName}
        )
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

  public validate(){
    if(this.email == '' || this.password == '' || this.displayName == ''){
    this.validator = false;
    }else{
      this.validator = true;
    }
  }


}
