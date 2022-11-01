// ANGULAR & BOOTSTRAP
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// MODELS
import { Organization } from 'src/app/core/models/organization.model';
//SERVICES
import { User } from 'src/app/core/models/user.model';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
//OTHERS
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
  })

export class EditProfileComponent implements OnInit {

    currentUser= new CurrentUser();
    user = new User();
    
    constructor(
        public route: ActivatedRoute,
        public modalService: NgbModal,
        private authService: AuthService,
        private userService: UserService,
        private sanitizer: DomSanitizer, 
    ){

    }

    ngOnInit(){
        this.initUser();
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

    updateProfile(){
        const aux = this.user;
        this.userService.updateUser(aux.uid!, aux);
    }

//////////////////////////// MODAL ////////////////////////////////////////////////////////
    openModal(content:any){
        this.modalService.open(content);
    }
    closeModal(){
        this.modalService.dismissAll();
    }



}
