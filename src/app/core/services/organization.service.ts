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

  addOrganizationEdit( organization: Organization){
    //La funcion next emite todos los valores obtenidos de "organization"
    this.organizationEdit.next(organization);
  }

  createOrganization( organization: Organization ): Promise<any>{
    return this.firebase.collection('organization').add(organization);
  }

  editOrganization(id: string, organization: any): Promise<any>{
    return this.firebase.collection('organization').doc(id).update(organization);
  }

  deleteOrganization(organizationID: string): Promise<any> {
    return this.firebase.collection('organization').doc(organizationID).delete();
  }

  getAllOrganizations(): Observable<any>{
    return this.firebase.collection('organization').snapshotChanges();
  }

  getOrganization(): Observable<Organization>{
    return this.organizationEdit.asObservable();
  }


}
