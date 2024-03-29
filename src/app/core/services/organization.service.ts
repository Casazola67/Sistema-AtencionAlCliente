import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor( private firebase: AngularFirestore ) { }

  createOrganization( organization: Organization ){
    return this.firebase.collection('organization').doc(organization.uid).set(organization);
  }

  deleteOrganization(organizationID: string): Promise<any> {
    return this.firebase.collection('organization').doc(organizationID).delete();
  }

  getAllOrganizations(): Observable<any>{
    return this.firebase.collection('organization').snapshotChanges();
  }

  getOrganization(id: any): Observable<any>{
    return this.firebase.collection('organization').doc(id).valueChanges();
  }
  
  editOrganization(id: string, organization: any): Promise<any>{
    return this.firebase.collection('organization').doc(id).update(organization);
  }


}
