import { Injectable, NgZone  } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

import { from, Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ////// Almacenamos la informacion del usuario | Save user data /////
  userData: any; 
  LoggedIn: boolean = false;
  auth = getAuth();

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone ) 
  {
    /*Almacenamos la informacion del usuario en el localstorage
    cuando esta loggeado, y es eliminado cuando cierra sesión*/
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    
    this.LoggedIn = false;

  }

  


   ///// Iniciar Sesion | Sign In /////
   SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
        this.LoggedIn = true;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  ///// Registrarse | Sign Up/////

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
  /* 1ER SIGN UP 
  SignUp(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SetUserData(result.user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  */


  ///// Cerrar Sesión | Sign Out /////
  SignOut() {
    this.LoggedIn = false;
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  ///// Iniciar Sesion con Google | Sign in with Google /////
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  /////
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.LoggedIn = true;
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
 
  ///// Obtener los datos del usuario | Get user data /////
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  ///// Verificar si el usuario esta logeado | Verify if user is logged in/////

  public isLoggedIn(): boolean {
    return this.LoggedIn;
  }

}
