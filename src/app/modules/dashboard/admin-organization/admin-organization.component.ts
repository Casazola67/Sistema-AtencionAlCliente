import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

import { Organization } from 'src/app/core/models/organization.model';
import { Schedule } from 'src/app/core/models/schedule.model';

import { OrganizationService } from 'src/app/core/services/organization.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-organization',
  templateUrl: './admin-organization.component.html',
  styleUrls: ['./admin-organization.component.css']
})
export class AdminOrganizationComponent implements OnInit {

  organization= new Organization();  
  organizationList: Organization[]= [];

  constructor(
    public modalService: NgbModal, 
    private _organizationService: OrganizationService,
    private userService: UserService 
    ) {
    this.businessHours = this.defaultBusinessHours;
   }

   
  ngOnInit(): void {
    this.getAllOrganizations();
    this.setHours();
  }
  
  createOrganization(){
    const organizationAux: Organization = {
      name: this.organization.name,
      admin: this.organization.admin,
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

  getAllOrganizations(){
    this._organizationService.getAllOrganizations().subscribe(doc =>{
      this.organizationList = [];
      doc.forEach((element:any) => {
        this.organizationList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      this.dataSource = new MatTableDataSource(this.organizationList);
    })
  }

  //////////////////////////////////////// STEPPER /////////////////////////////////////////////////////////////// 
  hours: string[] = [];
  timeFrom: string = '09:00';
  timeTo: string = '19:00';
  businessHours!: Schedule[];
  defaultBusinessHours: Schedule[] = [
    {day: 1, open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: true, from_full: '', to_full:''},
    {day: 2, open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: true, from_full: '', to_full:''},
    {day: 3, open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: true, from_full: '', to_full:''},
    {day: 4, open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: true, from_full: '', to_full:''},
    {day: 5, open_half: true, from_half: this.timeFrom, to_half: this.timeTo, open_full: true, from_full: '', to_full:''},
    {day: 6, open_half: false, from_half: '', to_half: '', open_full: false, from_full: '', to_full:''},
    {day: 0, open_half: false, from_half: '', to_half: '', open_full: false, from_full: '', to_full:''},
  ];


  
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
  
  change(i:number){
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

  //////////////////////////////////////// TABLE /////////////////////////////////////////////////////////////// 
  
  displayedColumns: string[] = ['Nombre', 'Acciones'];
  dataSource = new MatTableDataSource(this.organizationList);


  //////////////////////////////////////// VALIDATORS /////////////////////////////////////////////////////////////// 

  public validation= [true, true, true, true, true, true, true];
  public validID : boolean = true;

  public checkIfIDValid(event: any){
    //console.log(event.target.value);
    this.userService.getUser(event.target.value).subscribe( aux =>{
      if(aux){
        console.log(aux.uid);
        this.validID = true;
      }else{
        this.validID = false;
      }
    });
  }

  ////////////////////////////FUNCIONES QUE PUEDEN SER GLOBALES////////////////////////////////////////////////////////
  timeFormat = 'HH:mm';
  weekdays: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
  quarterHours: string[] = ['00', '15', '30', '45'];
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
    
}
