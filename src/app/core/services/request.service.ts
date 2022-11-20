import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {


  constructor( private firebase: AngularFirestore ) { }

  createRequest( request: Request ): Promise<any>{
    return this.firebase.collection('request').add(request);
  }

  deleteRequest(requestID: string): Promise<any> {
    return this.firebase.collection('request').doc(requestID).delete();
  }

  getAllRequest(): Observable<any>{
    return this.firebase.collection('request').snapshotChanges();
  }

  getRequest(id: any): Observable<any>{
    return this.firebase.collection('request').doc(id).valueChanges();
  }

  updateRequest(id: string, request: Request): Promise<any>{
    return this.firebase.collection('request').doc(id).update(request);
}

}