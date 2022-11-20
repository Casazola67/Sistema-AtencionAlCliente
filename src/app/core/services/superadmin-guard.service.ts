import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService , CurrentUser } from './auth.service';

@Injectable({
    providedIn: 'root'
  })

export class SuperAdminGuard implements CanActivate {

  currentUser= new CurrentUser();

    constructor(
      public authService: AuthService, 
      public router: Router){ }

    canActivate( ): boolean{
      this.currentUser = this.authService.getCurrentUser();
      if( this.currentUser.uid == 'M2224w0b8eMKwPhRgoKd06tE4tH3' ) { 
        return true;
      }else{
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
 
}

