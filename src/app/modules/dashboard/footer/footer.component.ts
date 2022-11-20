import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { Request } from 'src/app/core/models/request.model';
import { RequestService } from 'src/app/core/services/request.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  currentUser= new CurrentUser();
  user = new User();
  request = new Request();

  currentId: number = 0;

  constructor(public modalService: NgbModal, 
    public authService: AuthService, 
    public requestService: RequestService
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

  createRequest(){

    this.currentUser = this.authService.getCurrentUser();
    const uid = this.currentUser.uid;
    if(uid){
      this.authService.getUser(this.currentUser.uid).subscribe( obj => {
        this.user = obj;
      });
    }

    const requestAux: Request = {
      userUID: this.currentUser.uid,
      nameUser: this.user.displayName!,
      nameOrganization: this.request.nameOrganization,
      visible: this.request.visible,
      nitBase64: this.request.nitBase64,
      seprecBase64: this.request.seprecBase64
    }
    this.requestService.createRequest(requestAux).then(() => {
      console.log('Request created')
    })
  }

  picked(event: any, field: any) {
      this.currentId = field;
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        if (field == 1) {
          this.handleInputChange(file); //turn into base64
        }
        else if (field == 2) {
          this.handleInputChange(file); //turn into base64
        }
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
    let id = this.currentId;
    switch (id) {
      case 1:
        this.request.nitBase64 = base64result;
        break;
      case 2:
        this.request.seprecBase64 = base64result;
        break;
    }

  }

    //////////////////////////// MODAL ////////////////////////////////////////////////////////
    openModal(content:any){
      this.modalService.open(content);
    }
    closeModal(){
      this.modalService.dismissAll();
    }

}