import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })

export class SecureInnerPagesGuard implements CanActivate {

    constructor(public authService: AuthService, public router: Router)
    { }

    canActivate( ): boolean{
    const isLoggedIn : boolean = this.authService.isLoggedIn();
    if( isLoggedIn ) { 
        this.router.navigate(['/dashboard']);
        return false;
    }else{
      return true;
    }
  }

}
