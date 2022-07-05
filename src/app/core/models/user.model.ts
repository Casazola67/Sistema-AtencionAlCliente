export class User {

    id: string;
    name: string;
    displayName: string;
    email: string;
    phone: string;
    google: string;
    creation: number; 
    photo: string;

    constructor(){
        this.id = '';
        this.name = '';
        this.displayName = '';
        this.email = '';
        this.phone = ''; 
        this.google = '';
        this.creation = 0; 
        this.photo = '';   
    }
}

