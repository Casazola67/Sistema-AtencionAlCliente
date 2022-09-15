import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate {

    constructor(
      public authService: AuthService, 
      public router: Router){ }

    canActivate( ): boolean{
    const isLoggedIn : boolean = this.authService.isLoggedIn();
    if( !isLoggedIn ) { 
      this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
 
}

