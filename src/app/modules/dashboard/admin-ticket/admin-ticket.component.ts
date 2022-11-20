// ANGULAR & BOOTSTRAP
import { Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// MODELS
import { Organization } from 'src/app/core/models/organization.model';
import { Ticket } from 'src/app/core/models/ticket.model';
//SERVICES
import { OrganizationService } from 'src/app/core/services/organization.service';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';
import { TicketService } from 'src/app/core/services/ticket.service';
//OTHERS
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-admin-ticket',
    templateUrl: './admin-ticket.component.html',
    styleUrls: ['./admin-ticket.component.css'],
    providers: [],
  })

export class AdminTicketComponent implements OnInit {
 
    //////////////////////
    organization = new Organization();
    ticketList: Ticket[] = []; 
    ////////// Pending List //////////
    pendingList: Ticket[]= [];
    pendingCount: number = 0;
    pendingSource = new MatTableDataSource(this.ticketList);
    ////////// Active List //////////
    activeList: Ticket[] = [];
    activeCount: number = 0;
    activeSource = new MatTableDataSource(this.activeList);
    ////////// Closed List //////////
    closedList: Ticket[] = [];
    closedCount: number = 0;
    closedSource = new MatTableDataSource(this.closedList);
    ////////// Other //////////
    displayedColumns: string[] = ['Fecha', 'Hora', 'Usuario', 'Estado', 'Acciones'];
    currentUser= new CurrentUser();
    image: string = '';
    imageSource: any = '';

    constructor(
        public route: ActivatedRoute, 
        public router: Router, 
        public modalService: NgbModal,
        public dialog: MatDialog,
        private authService: AuthService,
        private organizationService: OrganizationService,
        private ticketService: TicketService,
        private sanitizer: DomSanitizer){}

    ngOnInit(): void {
        const RouteID = this.route.snapshot.paramMap.get('id');
        this.init(RouteID);
    }

    private init(ID : any){
        this.organizationService.getOrganization(ID).subscribe( aux => {
            this.organization = aux;
            if(this.organization.logoBase64){
                this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.organization.logoBase64}`);
            }
            this.checkIfAdmin();
        });
        this.ticketService.getAllTickets(ID).subscribe(doc => {
            this.ticketList = [];
            doc.forEach((element:any) => {
              this.ticketList.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              });
            });
            ///// Order by Date
            this.ticketList.sort(
                /*
                function(a, b) {
                    if (new Date(a.date).toLocaleDateString() > new Date(b.date).toLocaleDateString()) {return 1;}
                    if (new Date(a.date).toLocaleDateString() < new Date(b.date).toLocaleDateString()) {return -1;}
                    return 0;}
                */
                (objA, objB) => new Date(objB.date).getTime() - new Date(objA.date).getTime(),
            );

            ///// Get Pending Tickets
            this.pendingList = this.ticketList.filter((obj) => {
                return obj.status === 'Pendiente';
            });
            this.pendingCount = this.pendingList.length;
            this.pendingSource = new MatTableDataSource(this.pendingList);
            ///// Get Active Tickets
            this.activeList = this.ticketList.filter((obj) => {
                return obj.status === 'Activo';
            });
            this.activeCount = this.activeList.length;
            this.activeSource = new MatTableDataSource(this.activeList);
             ///// Get Closed Tickets
             this.closedList = this.ticketList.filter((obj) => {
                return obj.status === 'Cerrado';
            });
            this.closedCount = this.closedList.length;
            this.closedSource = new MatTableDataSource(this.closedList);
        });
    }

    applyFilter(id: string){
        switch(id){
            case 'Date Down':{
                this.pendingList.sort(function(a, b) {
                    if (a.date > b.date) {return 1;}
                    if (a.date < b.date) {return -1;}
                    return 0;});
                this.pendingSource = new MatTableDataSource(this.pendingList);
                break;}
                /*
                this.ticketList.sort((objA, objB) => new Date(objB.date).getTime() - new Date(objA.date).getTime(),);
                this.pendingSource = new MatTableDataSource(this.ticketList);
                break;}
                */
            case 'Date Up':{
                this.pendingList.sort(function(a, b) {
                    if (a.date > b.date) {return 1;}
                    if (a.date < b.date) {return -1;}
                    return 0;});
                this.pendingSource = new MatTableDataSource(this.pendingList);
                break;}
                /*
                this.ticketList.sort((objA, objB) => new Date(objA.date).getTime() - new Date(objB.date).getTime(),);
                this.pendingSource = new MatTableDataSource(this.ticketList);
                break;}
                */
            case 'Hour Up':{this.ticketList.sort(function(a, b) {
                        if (a.hour > b.hour) {return 1;}
                        if (a.hour < b.hour) {return -1;}
                        return 0;});
                this.pendingSource = new MatTableDataSource(this.ticketList);
                break;}
            case 'Hour Down':{this.ticketList.sort(function(a, b) {
                        if (a.hour < b.hour) {return 1;}
                        if (a.hour > b.hour) {return -1;}
                        return 0;});
                this.pendingSource = new MatTableDataSource(this.ticketList);
                break;}
            case 'Name Up':{this.ticketList.sort(function(a, b) {
                        if (a.nameUser > b.nameUser) {return 1;}
                        if (a.nameUser < b.nameUser) {return -1;}
                        return 0;});
                this.pendingSource = new MatTableDataSource(this.ticketList);
                break;}
            case 'Name Down':{this.ticketList.sort(function(a, b) {
                        if (a.nameUser < b.nameUser) {return 1;}
                        if (a.nameUser > b.nameUser) {return -1;}
                        return 0;});
                this.pendingSource = new MatTableDataSource(this.ticketList);
                break;}
        }
    }
    applyFilterActive(id: string){
        switch(id){
            case 'Date Down':{
                this.activeList.sort(function(a, b) {
                    if (a.date > b.date) {return 1;}
                    if (a.date < b.date) {return -1;}
                    return 0;});
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
                /*
                this.activeList.sort((objA, objB) => new Date(objB.date).getTime() - new Date(objA.date).getTime(),);
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
                */
            case 'Date Up':{
                this.activeList.sort(function(a, b) {
                    if (a.date < b.date) {return 1;}
                    if (a.date > b.date) {return -1;}
                    return 0;});
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
                /*
                this.activeList.sort((objA, objB) => new Date(objA.date).getTime() - new Date(objB.date).getTime(),);
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
                */
            case 'Hour Up':{this.activeList.sort(function(a, b) {
                        if (a.hour > b.hour) {return 1;}
                        if (a.hour < b.hour) {return -1;}
                        return 0;});
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
            case 'Hour Down':{this.activeList.sort(function(a, b) {
                        if (a.hour < b.hour) {return 1;}
                        if (a.hour > b.hour) {return -1;}
                        return 0;});
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
            case 'Name Up':{this.activeList.sort(function(a, b) {
                        if (a.nameUser > b.nameUser) {return 1;}
                        if (a.nameUser < b.nameUser) {return -1;}
                        return 0;});
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
            case 'Name Down':{this.activeList.sort(function(a, b) {
                        if (a.nameUser < b.nameUser) {return 1;}
                        if (a.nameUser > b.nameUser) {return -1;}
                        return 0;});
                this.activeSource = new MatTableDataSource(this.activeList);
                break;}
        }
    }

    applyFilterClosed(id: string){
        switch(id){
            case 'Date Down':{
                this.closedList.sort(function(a, b) {
                    if (a.date > b.date) {return 1;}
                    if (a.date < b.date) {return -1;}
                    return 0;});
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
                /*
                this.closedList.sort((objA, objB) => new Date(objB.date).getTime() - new Date(objA.date).getTime(),);
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
                */
            case 'Date Up':{
                this.closedList.sort(function(a, b) {
                    if (a.date < b.date) {return 1;}
                    if (a.date > b.date) {return -1;}
                    return 0;});
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
                /*
                this.closedList.sort((objA, objB) => new Date(objA.date).getTime() - new Date(objB.date).getTime(),);
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
                */
            case 'Hour Up':{this.closedList.sort(function(a, b) {
                        if (a.hour > b.hour) {return 1;}
                        if (a.hour < b.hour) {return -1;}
                        return 0;});
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
            case 'Hour Down':{this.closedList.sort(function(a, b) {
                        if (a.hour < b.hour) {return 1;}
                        if (a.hour > b.hour) {return -1;}
                        return 0;});
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
            case 'Name Up':{this.closedList.sort(function(a, b) {
                        if (a.nameUser > b.nameUser) {return 1;}
                        if (a.nameUser < b.nameUser) {return -1;}
                        return 0;});
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
            case 'Name Down':{this.closedList.sort(function(a, b) {
                        if (a.nameUser < b.nameUser) {return 1;}
                        if (a.nameUser > b.nameUser) {return -1;}
                        return 0;});
                this.closedSource = new MatTableDataSource(this.closedList);
                break;}
        }
    }

    buttonAction(action: string, ticket: Ticket){
        const aux = ticket;
        if(action == 'active'){
            aux.status = 'Activo';
            this.ticketService.updateTicket(aux.id, aux);
        }else if(action == 'close'){
            aux.status = 'Cerrado';
            this.ticketService.updateTicket(aux.id, aux);
        }
    }

    //////////////////////////// AUTH //////////////////////////////////////////////////////////

    checkIfAdmin(){
        this.currentUser = this.authService.getCurrentUser();
        if(this.currentUser.uid !== 'M2224w0b8eMKwPhRgoKd06tE4tH3' && 
            this.currentUser.uid !== this.organization.adminUID){
            this.router.navigate(['/']);
        }
    }

    //////////////////////////// DIALOG ////////////////////////////////////////////////////////
    openDialog() {
        const dialogRef = this.dialog.open(AdminTicketDialog, {
            data: {
                route: this.route.snapshot.paramMap.get('id'),
            }
        });
    }

}

/* //////////////////// DIALOG //////////////////// */
@Component({
    selector: 'admin-ticket-dialog',
    templateUrl: './admin-ticket-dialog.component.html',
    providers: [],
})
export class AdminTicketDialog {

    ticket = new Ticket;

    selected: Date;
    minDate: Date;
    maxDate: Date;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private ticketService: TicketService,
    ){
        this.selected = new Date();
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 0, 0, 1);
        this.maxDate = new Date(currentYear + 1, 0, 31);
    }

    ngOnInit(): void{
        this.setHours();
    }

    createTicket(){
        const ticketAux: Ticket = {
          idOrganization: this.data.route,
          nameUser: this.ticket.nameUser,
          date: this.selected.toLocaleDateString(),
          hour: this.ticket.hour,
          status: 'Activo'
        }

        this.ticketService.createTicket(ticketAux).then(() => {
          console.log('Ticket created')
        }, error => {
          console.log(error);
        })
        
      }

    minutes: string[] = ['00','05', '10','15', '20','25', '30','35', '40','45', '50','55'];
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
