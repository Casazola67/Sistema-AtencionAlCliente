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
    filterList: Organization[]= [];

    constructor(private _organizationService: OrganizationService, public router: Router,){

    }

    
    ngOnInit(): void {
      this.getAllOrganizations();
    }

    getAllOrganizations(){
        
        this._organizationService.getAllOrganizations().subscribe(doc =>{
          this.organizationList = [];
          doc.forEach((element:any) => {
            this.organizationList.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });
            this.filterList = this.organizationList;
          });
          //console.log(this.organizationList);
        })
    }

    goTo(id: any){
      this.router.navigate(['/ticket', {id: id}]);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toString();
      console.log(filterValue);
      if(filterValue != null){
        this.filterList = this.filterList.filter((obj) => {
          return obj.name === filterValue;
        });
        console.log(this.filterList);
      }
      
    }
  }
