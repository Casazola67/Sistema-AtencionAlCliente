import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

import { Ticket } from '../models/ticket.model';

@Injectable({
    providedIn: 'root'
  })
export class TicketService {

    constructor(private firebase: AngularFirestore){}

    createTicket( ticket: Ticket ): Promise<any>{
        return this.firebase.collection('ticket').add(ticket);
    }

    getAllTickets( id: any ): Observable<any>{
        return this.firebase.collection('ticket', ref => ref.where('idOrganization', '==', id)).snapshotChanges();
    }

    updateTicket(id: string, ticket: Ticket): Promise<any>{
        return this.firebase.collection('ticket').doc(id).update(ticket);
    }

}
