///// ANGULAR /////
import { Injectable, NgZone, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
///// FIREBASE | FIRESTORE /////
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, setPersistence, browserSessionPersistence } from "firebase/auth";

///// OTHERS /////
import { from, Observable, first  } from 'rxjs';

///// MODELS /////
import { User } from '../models/user.model';
export class CurrentUser{
  uid: string;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(){
    this.uid = '';
    this.isLoggedIn = false;
    this.isAdmin = false
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUser = new CurrentUser();
  public userSigned = new EventEmitter();

  userData: any; 
  auth = getAuth();

  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router, 
    public ngZone: NgZone ) 
  {
    /*Almacenamos la informacion del usuario en el localstorage
    cuando esta loggeado, y es eliminado cuando cierra sesión*/
    
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);

        this.userSigned.next(true);
      } else {
        localStorage.clear();
        //localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    this.checkIfLoggedIn();
  }

   ///// Iniciar Sesion | Sign In /////
   SignIn(email: string, password: string): Observable<any> {
    
    return from(signInWithEmailAndPassword(this.auth, email, password).then((response)=>{
      //this.LoggedIn = true;
      const uid = (response !== null && response !== undefined) ? response.user.uid : '';
      this.setUserData(uid);
      })
      .catch((error) => {
        window.alert('Ingrese un correo electrónico o una contraseña válida');
      })
    );
   }

  ///// Registrarse | Sign Up/////
  SignUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
 
  ///// Cerrar Sesion | Log out /////
  /*
  public async LogOut(){
    await this.auth.signOut();
    this.currentUser = {
      uid: '',
      isLoggedIn: false,
      isAdmin: false
    }
    //localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(["/login"]);
  }*/
  public async LogOut(){
    return this.auth.signOut().then(() => {
      this.currentUser = {
        uid: '',
        isLoggedIn: false,
        isAdmin: false
      }
      //localStorage.removeItem('user');
      localStorage.clear();
      this.userData = '';
      this.router.navigate([""]);
    });
  }

  ///// Iniciar Sesion con Google | Sign in with Google /////
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        //this.LoggedIn = true;
        this.setGoogleUserData(result.user);
      })
  }
 
  ///// Obtener los datos del usuario logueado mediante Google| Get Google user data /////
  setGoogleUserData(user: any) {
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
    this.setUserData(user.uid);
    return userRef.set(userData, {
      merge: true,
    });
  }

  ///// Obtener los datos del usuario | Get user data /////
  private setUserData(uid: string){
    this.currentUser = {
      uid: uid,
      isLoggedIn: true,
      isAdmin: false
    }
    this.userSigned.next(true);
  }

  public checkIfLoggedIn(){
    const that = this;
    this.auth.onAuthStateChanged(async function (user) {
      if(user){
        that.setUserData(user.uid);
        that.getUser(user.uid).subscribe(obj => {
          that.userData = obj;
        })
      }
      else{
        that.currentUser = {
          uid: '',
          isLoggedIn: false,
          isAdmin: false
        }
        //localStorage.removeItem('user');
        localStorage.clear();
      }
    })
  }

  public getUser(id: string): Observable<any>{
    return this.afs.collection('users').doc(id).valueChanges();
  }

  public getCurrentUser(): CurrentUser {
    return this.currentUser;
  };

  public async getUserData(){
    await this.userData;
  }

  public isLoggedIn(): boolean{
    return this.currentUser.isLoggedIn;
  };

}
