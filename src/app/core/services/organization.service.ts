import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor( private firebase: AngularFirestore ) { }

  createOrganization( organization: Organization ): Promise<any>{
    return this.firebase.collection('organization').add(organization);
  }

  getAllOrganizations(): Observable<any>{
    return this.firebase.collection('organization').snapshotChanges();
  }

}
