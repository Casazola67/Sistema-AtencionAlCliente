import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private firebase: AngularFirestore) { }

  addUser(user: User){
    return this.firebase.collection('users').doc(user.uid).set(user);
  }

  getAllUsers(): Observable<any>{
    return this.firebase.collection('users').snapshotChanges();
  }

  getUser(id:any): Observable<any>{
    return this.firebase.collection('users').doc(id).valueChanges();
  }

  updateUser(id: string, user: User): Promise<any>{
    return this.firebase.collection('users').doc(id).update(user);
  }

}
