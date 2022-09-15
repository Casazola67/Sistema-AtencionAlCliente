import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private organizationEdit = new Subject<Organization>();

  constructor( private firebase: AngularFirestore ) { }

  createOrganization( organization: Organization ): Promise<any>{
    return this.firebase.collection('organization').add(organization);
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
  /*
  editOrganization(id: string, organization: any): Promise<any>{
    return this.firebase.collection('organization').doc(id).update(organization);
  }

  addOrganizationEdit( organization: Organization){
    this.organizationEdit.next(organization);
  }

  getOrganization(): Observable<Organization>{
    return this.organizationEdit.asObservable();
  }
  */


}
