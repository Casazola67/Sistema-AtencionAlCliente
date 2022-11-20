import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Organization } from 'src/app/core/models/organization.model';

import { OrganizationService } from 'src/app/core/services/organization.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })

  export class HomeComponent implements OnInit {

    currentDay:number= new Date().getDay();
    organizationList: Organization[]= [];
    filterList: Organization[]= [];

    lenght: number = 0;

    constructor(
      private _organizationService: OrganizationService, 
      public router: Router,
      private sanitizer: DomSanitizer,)
    {
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
            this.lenght = this.organizationList.length;
          });
          for(var i = 0; i <= this.organizationList.length; i++){
            if( this.organizationList[i].logoBase64){
              const image = this.organizationList[i].logoBase64;
              this.organizationList[i].logoBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`)
            }
          }
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

    searchValue: string = '';

    @Output()
    searchTextChanged: EventEmitter<string> = new EventEmitter<string>()

    onSearchTextChanged(){
      this.searchTextChanged.emit(this.searchValue);
      console.log(this.searchValue);
    }

  }
