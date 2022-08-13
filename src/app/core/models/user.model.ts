export class User {

    uid?: string;
    email?: string;
    name?: string;
    displayName?: string;
    
    phone?: string;
    emailVerified?: string;
    creation?: number; 
    photoURL?: string;

    constructor(){
        this.uid = '';
        this.email = '';
        this.name = '';
        this.displayName = '';
        this.phone = ''; 
        this.emailVerified = '';
        this.creation = 0; 
        this.photoURL = ''; 
    }
}

