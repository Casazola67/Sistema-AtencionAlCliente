// ANGULAR & BOOTSTRAP
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// MODELS
import { Request } from 'src/app/core/models/request.model';
//SERVICES
import { RequestService } from 'src/app/core/services/request.service';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
//OTHERS

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
  })

export class RequestComponent implements OnInit {

    currentUser = new CurrentUser();
    requestList: Request[] = [];
    filterRequestList: Request[]=[];

    constructor(
        public route: ActivatedRoute, 
        public router: Router, 
        private authService: AuthService,
        private requestService: RequestService,
    ){
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        this.initRequests();
    }

    initRequests(){

        if( this.currentUser.uid == "M2224w0b8eMKwPhRgoKd06tE4tH3"){
            this.requestService.getAllRequest().subscribe(doc => {
                this.requestList = [];
                doc.forEach((element:any) => {
                    this.requestList.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data()
                    });
                });
                this.filterRequestList = this.requestList.filter((obj) => {
                    return obj.visible === true;
                });
            })
        }

    }

    applyFilter(id: string){
        switch(id){
            case 'Oculto':{
                this.filterRequestList = this.requestList.filter((obj) => {
                    return obj.visible === false;
                });
                console.log(this.filterRequestList);
                break;}
            case 'Visible':{
                this.filterRequestList = this.requestList.filter((obj) => {
                    return obj.visible === true;
                });
                console.log(this.filterRequestList);
                break;}
        }
    }


    buttonAction(action: string, request: Request){
        const aux = request;

        if (action == 'close'){
            aux.visible = false;
            this.requestService.updateRequest(aux.id!, aux);
        }
    }


    downloadImage(value: string, option: number){
        var image = "data:image/jpg;base64," + value;
        var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", image);
      if(option == 1){
        link.setAttribute("download", "NIT.jpg");
        link.click();
      }else if(option == 2){
        link.setAttribute("download", "SEPREC.jpg");
        link.click();
      }
      
    }

}
