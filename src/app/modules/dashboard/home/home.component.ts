import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import * as moment from 'moment';

import { Organization } from 'src/app/core/models/organization.model';

import { OrganizationService } from 'src/app/core/services/organization.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })

  export class HomeComponent implements OnInit {

    currentDay:number= new Date().getDay();
    organizationList: Organization[]= [];

    constructor(private _organizationService: OrganizationService, public router: Router,){

    }

    getAllOrganizations(){
        
        this._organizationService.getAllOrganizations().subscribe(doc =>{
          this.organizationList = [];
          doc.forEach((element:any) => {
            this.organizationList.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });
          });
          //console.log(this.organizationList);
        })
    }

    goTo(id: any){
      this.router.navigate(['/ticket', {id: id}]);
    }

    ngOnInit(): void {
        this.getAllOrganizations();
    }

  }
