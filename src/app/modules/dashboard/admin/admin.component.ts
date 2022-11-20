// ANGULAR & BOOTSTRAP
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// MODELS
import { Organization } from 'src/app/core/models/organization.model';
//SERVICES
import { OrganizationService } from 'src/app/core/services/organization.service';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
//OTHERS
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
  })

export class AdminComponent implements OnInit {

    currentUser = new CurrentUser();
    organizationList: Organization[]= [];
    userOrganizations: Organization[] = [];

    RouteID: string | null = '';

    constructor(
        public route: ActivatedRoute, 
        public router: Router, 
        public modalService: NgbModal,
        private authService: AuthService,
        private organizationService: OrganizationService,
        private sanitizer: DomSanitizer,)
    {
        
    }
    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        this.initOrganizations();
    }

    initOrganizations(){

        if( this.currentUser.uid == "M2224w0b8eMKwPhRgoKd06tE4tH3"){
            this.organizationService.getAllOrganizations().subscribe(doc =>{
                this.organizationList = [];
                doc.forEach((element:any) => {
                  this.organizationList.push({
                    id: element.payload.doc.id,
                    //logoBase64: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.payload.doc.logoBase64}`),
                    ...element.payload.doc.data()
                  });
                });
                for(var i = 0; i <= this.organizationList.length; i++){
                  if( this.organizationList[i].logoBase64){
                    const image = this.organizationList[i].logoBase64;
                    this.organizationList[i].logoBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`)
                  }
                }
              })

        }
        else{
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

    goTo(id: any){
        this.router.navigate(['/admin-ticket', {id: id}]);
    }

    goToEdit(id: any){
      this.router.navigate(['/edit-org', {id: id}]);
    }
  
}