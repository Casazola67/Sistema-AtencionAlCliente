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
    selector: 'app-edit-organization',
    templateUrl: './edit-organization.component.html',
    styleUrls: ['./edit-organization.component.css']
  })

export class EditOrganizationComponent implements OnInit {

    organization = new Organization();
    currentUser= new CurrentUser();
    image: string = '';
    imageSource: any = '';

    constructor(
        public route: ActivatedRoute, 
        public modalService: NgbModal,
        private authService: AuthService,
        private organizationService: OrganizationService,
        private sanitizer: DomSanitizer,)
    {

    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        const organizationID = this.route.snapshot.paramMap.get('id');
        this.init(organizationID)
    }

    private init(ID : any){
        this.organizationService.getOrganization(ID).subscribe( aux => {
            this.organization = aux;
            if(this.organization.logoBase64){
                this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.organization.logoBase64}`);
            }
        });
       
    }


    updateOrg(){
        const aux = this.organization;
        this.organizationService.editOrganization(aux.id!, aux);
    }

    //////////////////////////// BASE64 ////////////////////////////////////////////////////////

    picked(event: any) {
        
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            this.handleInputChange(file); //turn into base64
            console.log(this.organization.logoBase64);
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
