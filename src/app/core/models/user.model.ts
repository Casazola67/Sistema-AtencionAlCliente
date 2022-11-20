export class User {

    uid: string;
    email: string;
    displayName?: string;
    phone?: string;
    emailVerified?: boolean;
    photoURL?: string;
    name?: string;
    lastName?: string;

    constructor(){
        this.uid = '';
        this.email = '';
        this.displayName = '';
        this.phone = ''; 
        this.emailVerified = false;
        this.photoURL = '';
        this.name = '';
        this.lastName= ''; 
    }
}

