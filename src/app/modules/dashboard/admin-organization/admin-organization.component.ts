// ANGULAR & BOOTSTRAP
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
// MODELS
import { Organization } from 'src/app/core/models/organization.model';
import { Schedule } from 'src/app/core/models/schedule.model';
// SERVICES
import { OrganizationService } from 'src/app/core/services/organization.service';
import { UserService } from 'src/app/core/services/user.service';
//OTHERS
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-organization',
  templateUrl: './admin-organization.component.html',
  styleUrls: ['./admin-organization.component.css']
})
export class AdminOrganizationComponent implements OnInit {

  organization= new Organization();  
  organizationList: Organization[]= [];

  image: string = '';
  imageSource: any = '';

  validator: boolean = false;

  constructor(
    public route: ActivatedRoute, 
    public router: Router, 
    public modalService: NgbModal, 
    public organizationService: OrganizationService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private firebase: AngularFirestore,
    ) {
    this.businessHours = this.defaultBusinessHours;
   }

   
  ngOnInit(): void {
    this.getAllOrganizations();
    this.setHours();
  }
  
  createOrganization(){
    const uid = this.firebase.createId()
    const organizationAux: Organization = {
      uid: uid,
      adminUID: this.organization.adminUID,
      name: this.organization.name,
      schedule: this.businessHours,

      nit: this.organization.nit,
      logoBase64: this.image,
      phone: this.organization.phone,
      email: this.organization.email,

      state: this.organization.state,
      city: this.organization.city,
      adress: this.organization.adress,
      latitude: this.organization.latitude,
      longitude: this.organization.longitude
      
    }
    this.organizationService.createOrganization(organizationAux).then(() => {
      console.log('Organization created')
    }, error => {
      console.log(error);
    })
  }

  deleteOrganization(organizationID: any){
    this.organizationService.deleteOrganization(organizationID);
  }

  getAllOrganizations(){
    this.organizationService.getAllOrganizations().subscribe(doc =>{
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

    if(this.allAreTrue(this.validation) == true){
      this.validSchedule = true;
      this.validate();
    }else {
      this.validSchedule = false;
      this.validate();
    }
  }

  //////////////////////////////////////// TABLE /////////////////////////////////////////////////////////////// 
  
  displayedColumns: string[] = ['Nombre', 'Acciones'];
  dataSource = new MatTableDataSource(this.organizationList);


  //////////////////////////////////////// VALIDATORS /////////////////////////////////////////////////////////////// 

  public validation= [true, true, true, true, true, true, true];
  public allAreTrue(arr : Boolean[]){
    return arr.every(element => element === true);
  }
  public validSchedule: boolean = true;
  public validID : boolean = false;

  public checkIfIDValid(event: any){
    this.validate();
    this.userService.getUser(event.target.value).subscribe( aux =>{
      if(aux){
        this.validID = true;
      }else{
        this.validID = false;
      }
    });
  }

  public validate(){
    if(this.organization.name == '' || this.organization.adminUID == '' || this.validSchedule == false ){
    this.validator = false;
    console.log(this.validator);
    }else{
      this.validator = true;
    console.log(this.validator);
    }
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
    this.organization.logoBase64 = base64result;
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64result}`);
    console.log(this.image);
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

  goToEdit(id: any){
    this.router.navigate(['/edit-org', {id: id}]);
  }
}
