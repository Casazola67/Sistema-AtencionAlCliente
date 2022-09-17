export class User {

    uid: string;
    email: string;
    displayName?: string;
    tag?: string;
    phone?: string;
    emailVerified?: boolean;
    creation?: number; 
    photoURL?: string;

    constructor(){
        this.uid = '';
        this.email = '';
        this.tag = '';
        this.displayName = '';
        this.phone = ''; 
        this.emailVerified = false;
        this.creation = 0; 
        this.photoURL = ''; 
    }
}

