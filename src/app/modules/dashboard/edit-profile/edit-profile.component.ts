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
    image: string = '';
    imageSource: any = '';

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
            if(this.user.photoURL){
              this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.user.photoURL}`);
            }
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

    //////////////////////////// BASE64 ////////////////////////////////////////////////////////

    picked(event: any) {
        
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
          const file: File = fileList[0];
          this.handleInputChange(file); //turn into base64
      }
      else {
        alert("No file selected");
      }
      
  }

  handleInputChange(files: any) {
      var file = files;
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
      let reader = e.target;
      var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      this.image = base64result;
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64result}`);
  }   


//////////////////////////// MODAL ////////////////////////////////////////////////////////
    openModal(content:any){
        this.modalService.open(content);
    }
    closeModal(){
        this.modalService.dismissAll();
    }



}
