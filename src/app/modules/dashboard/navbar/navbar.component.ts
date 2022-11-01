import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { Organization } from 'src/app/core/models/organization.model';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import { OrganizationService } from 'src/app/core/services/organization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser= new CurrentUser();
  user = new User();

  organizationList: Organization[]= [];

  constructor(
    public authService: AuthService, 
    private router: Router,
    private organizationService: OrganizationService,
    ) {}

  ngOnInit(){
    this.init();
  }

  async init(){
    this.initUser();
    this.initOrganizations();
  }

  initOrganizations(){

    if( this.currentUser.uid == "M2224w0b8eMKwPhRgoKd06tE4tH3"){
        this.organizationService.getAllOrganizations().subscribe(doc =>{
            this.organizationList = [];
            doc.forEach((element:any) => {
              this.organizationList.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              });
            });
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

  initUser(){
    this.authService.checkIfLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    const uid = this.currentUser.uid;
    if(uid){
      this.authService.getUser(this.currentUser.uid).subscribe( obj => {
        this.user = obj;
      });
    }else{
      this.user = {
        uid: '',
        email: '',
      }
    }
  }

  public goTo(route: string){
    this.router.navigate(["/"+route]);
  }

  async LogOut(){
    await this.authService.LogOut();
  }

}
