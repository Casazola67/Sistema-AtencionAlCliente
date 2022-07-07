import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private firebase: AngularFirestore ) { }
  
}
