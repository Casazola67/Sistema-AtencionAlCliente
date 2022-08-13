import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

import { Organization } from 'src/app/core/models/organization.model';
import { Schedule } from 'src/app/core/models/schedule.model';
import { OrganizationService } from 'src/app/core/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organization= new Organization();  
  organizationList: Organization[]= [];

  constructor(public modalService: NgbModal, private _organizationService: OrganizationService ) {
    this.businessHours = this.defaultBusinessHours;
   }

  createOrganization(){
    const organizationAux: Organization = {
      name: this.organization.name,
      adress: this.organization.adress,
      city: this.organization.city,
      phone: this.organization.phone,
      schedule: this.businessHours,
    }
    this._organizationService.createOrganization(organizationAux).then(() => {
      console.log('Organization created')
    }, error => {
      console.log(error);
    })
  }

  deleteOrganization(organizationID: any){
    this._organizationService.deleteOrganization(organizationID);
  }

  saveAndEditOrganization(organization: Organization){
    this._organizationService.addOrganizationEdit(organization);
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

  ////////////////////////////////////////HORARIO PRUEBA///////////////////////////////////////////////////////////////
  timeFormat = 'HH:mm';
  weekdays: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
  quarterHours: string[] = ['00', '15', '30', '45'];
  hours: string[] = [];
  timeFrom: string = '09:00';
  timeTo: string = '19:00';
  businessHours!: Schedule[];
  defaultBusinessHours: Schedule[] = [
    {open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: false, from_full: '', to_full:''},
    {open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: false, from_full: '', to_full:''},
    {open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: false, from_full: '', to_full:''},
    {open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: false, from_full: '', to_full:''},
    {open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: false, from_full: '', to_full:''},
    {open_half: false, from_half: '', to_half: '', open_full: false, from_full: '', to_full:''},
    {open_half: false, from_half: '', to_half: '', open_full: false, from_full: '', to_full:''},
  ];


  setHours(){
    for(var i = 0; i < 24; i++){
      for(var j = 0; j < 4; j++){
        var time = i + ":" + this.quarterHours[j];
        if(i < 10){
          time = "0" + time;
        }
        this.hours.push(time);
      }
    }
  }
  
  disable(i: number){
    //console.log(this.businessHours);
    if(!this.businessHours[i].open_half){
      this.businessHours[i].from_half = this.timeFrom;
      this.businessHours[i].to_half = this.timeTo;
      this.businessHours[i].from_full = '';
      this.businessHours[i].to_full = '';
    }
    if(this.businessHours[i].open_half){
      this.businessHours[i].from_half = '';
      this.businessHours[i].to_half = '';
      this.businessHours[i].from_full = '';
      this.businessHours[i].to_full = '';
      this.businessHours[i].open_full= false;
    }
  }

  public validation= [true, true, true, true, true, true, true];
  
  change(i:number){
    const aux = 0;
    const timeFrom_half = moment(this.businessHours[i].from_half, 'HH:mm');
    const timeTo_half = moment(this.businessHours[i].to_half, 'HH:mm');
    const timeFrom_full = moment(this.businessHours[i].from_full, 'HH:mm');
    const timeTo_full = moment(this.businessHours[i].to_full, 'HH:mm');

    if(timeFrom_half < timeTo_half){
      this.validation[i] = true;
      if(!this.businessHours[i].open_full){        
        if(timeFrom_full > timeTo_half && timeFrom_full < timeTo_full){
        this.validation[i] = true;
        }
        else if(timeFrom_full < timeTo_half || timeTo_full < timeTo_half ){
          this.validation[i] = false;
        }
      } 
    }
    else{
      this.validation[i] = false; 
    }
    console.log(this.validation);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void {
    this.getAllOrganizations();
    this.setHours();
  }

}
