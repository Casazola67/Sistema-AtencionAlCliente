// ANGULAR & BOOTSTRAP
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// MODELS
import { Organization } from 'src/app/core/models/organization.model';
import { Schedule } from 'src/app/core/models/schedule.model';
import { Ticket } from 'src/app/core/models/ticket.model';
//SERVICES
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { TicketService } from 'src/app/core/services/ticket.service';
//OTHERS
import * as moment from 'moment';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css']
  })

  export class TicketComponent implements OnInit {

    currentUser= new CurrentUser();
    organization = new Organization();
    editTicket = new Ticket();

    currentDay = new Schedule;
    schedule: Schedule [] = [];

    ticket = new Ticket;
    userTicket: Ticket[] = [];
    ticketList: Ticket[] = [];
    ticketsToday: Ticket[] = [];


    selected: Date;
    minDate: Date;
    maxDate: Date;

    constructor(
      public route: ActivatedRoute, 
      public modalService: NgbModal,
      private authService: AuthService,
      private organizationService: OrganizationService,
      private ticketService: TicketService,
      )
    { 
      this.selected = new Date();
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 0, 0, 1);
      this.maxDate = new Date(currentYear + 1, 0, 31);
    }


    ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();
      const ticketID = this.route.snapshot.paramMap.get('id');
      this.init(ticketID);
    }

    private init(ID : any){
      this.setHours();
      //this.onDateChange(this.selected);
      ///// Get all organizations
      this.organizationService.getOrganization(ID).subscribe( aux => {
        this.organization = aux;
        if(this.organization.schedule){
          this.schedule =this.organization.schedule;
        }
        /////Get current day
        let item = this.schedule.find(i => i.day === new Date().getDay());
        if(item){
          this.currentDay = item;
        }
      });
      /////Get Tickets from an specific organization
      this.ticketService.getAllTickets(ID).subscribe(doc => {
        this.ticketList = [];
        doc.forEach((element:any) => {
          this.ticketList.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        /////Filter and order today tickets
        this.ticketsToday = this.ticketList.filter((obj) => {
          return obj.date === new Date().toDateString();
        });
        this.ticketsToday.sort(function(a,b){
          if(moment(a.hour, 'HH:mm') > moment(b.hour, 'HH:mm')){
            return 1;
          }if(moment(a.hour, 'HH:mm') < moment(b.hour, 'HH:mm')){
            return -1;
          }
          return 0;
        })
        /////Get User Ticket
        this.userTicket = this.ticketList.filter((obj) => {
          return obj.idUser === this.currentUser.uid && obj.status === 'Activo' || obj.idUser === this.currentUser.uid && obj.status === 'Pendiente';
        })
      });
      
    }
    //////////////////////////// MODAL ////////////////////////////////////////////////////////
    openModal(content:any){
      this.modalService.open(content);
    }
    closeModal(){
      this.modalService.dismissAll();
    }
    //////////////////////////// ACCORDION ////////////////////////////////////////////////////////
    step = 5;
    validDay = false;
    setStep(index: number) {
      this.step = index;
    }
    nextStep() {
      this.step++;
    }
    prevStep() {
      this.step--;
    }
    //////////////////////////// MAT DATE INPUT ////////////////////////////////////////////////////////
    onDateChange(event : any) {
      //const aux = moment(event.value).format("YYYY-MM-DD");
      const date = new Date(event.value).getDay();
      let itemAux = this.schedule.find(i => i.day === date); 
      if(itemAux){
        const 
        hourFrom_half = moment(itemAux.from_half, 'HH:mm'),
        hourTo_half = moment(itemAux.to_half, 'HH:mm'), 
        hourFrom_full = moment(itemAux.from_full, 'HH:mm'),
        hourTo_full = moment(itemAux.to_full, 'HH:mm');
        if(itemAux.from_half){
          this.validDay = false;
          for( let i = 0; i < this.hours.length; i++ ){
            const 
            hour = moment(this.hours[i], 'HH:mm'),
            index = this.hours.indexOf(this.hours[i]);
            if(hour < hourFrom_half){
              this.hours.splice(index, 1);
              i--;
            }
            if(!itemAux.open_full){
              if(hour > hourTo_half && hour < hourFrom_full || hour > hourTo_full){
                this.hours.splice(index, 1);
                i--;
              }
            }
            else if(hour > hourTo_half){
              this.hours.splice(index, 1);
                i--;
            }     
          }
        }else if(!itemAux.open_half){
          this.validDay = true;
        } 
      }
    } 

    //////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////
    createTicket(){
      const ticketAux: Ticket = {
        idOrganization: this.route.snapshot.paramMap.get('id')?.toString(),
        idUser: this.currentUser.uid,
        nameUser: this.authService.userData.displayName,
        date: this.selected.toLocaleDateString(),
        hour: this.ticket.hour,
        status: 'Pendiente'

      }
      this.ticketService.createTicket(ticketAux).then(() => {
        console.log('Ticket created')
      }, error => {
        console.log(error);
      })
    }


    ////////////////////////////FUTURE GLOBAL FUNCTIONS////////////////////////////////////////////////////////
    timeFormat = 'HH:mm';
    //quarterHours: string[] = ['00', '15', '30', '45'];
    minutes: string[] = ['00','05', '10','15', '20','25', '30','35', '40','45', '50','55'];
    weekdays: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
    hours: string[] = [];


    setHours(){
      for(var i = 0; i < 24; i++){
        for(var j = 0; j < 12; j++){
          var time = i + ":" + this.minutes[j];
            if(i < 10){
              time = "0" + time;
            }
          this.hours.push(time);
        }
      }
    }

  }
