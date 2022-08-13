import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFirestore) { }

  addUser(user: User){
    return this.firebase.collection('users').doc(user.uid).set(user);
  }
}
