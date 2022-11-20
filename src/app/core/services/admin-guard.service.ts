import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService , CurrentUser } from './auth.service';

import { OrganizationService } from 'src/app/core/services/organization.service';
import { Organization } from 'src/app/core/models/organization.model';

@Injectable({
    providedIn: 'root'
  })

export class AdminGuard implements CanActivate {
    currentUser= new CurrentUser();
    organizationList: Organization[]= [];

    constructor(
      public authService: AuthService, 
      public router: Router,
      private organizationService: OrganizationService,){ }

    canActivate( ): boolean{
      this.currentUser = this.authService.getCurrentUser();
      this.initOrganizations();
      if( this.currentUser.uid == 'M2224w0b8eMKwPhRgoKd06tE4tH3' || this.organizationList.length > 0  ) { 
        return true;
      }else{
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
 
    initOrganizations(){
        this.organizationService.getAllOrganizations().subscribe(doc =>{
            this.organizationList = [];
            doc.forEach((element:any) => {
              this.organizationList.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              });
            });
            this.organizationList = this.organizationList.filter((obj) => {
                return obj.adminUID?.toString() === this.currentUser.uid;
            });
          })
    }

}
