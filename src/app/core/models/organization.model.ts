import { Schedule } from "./schedule.model";

export class Organization {

    uid: string;
    name: string;
    adminUID: string;
    schedule: Schedule[];

    //////info
    nit: string;
    logoBase64!: any;
    phone: string;
    email: string;

    //////location
    state: string;
    city: string;
    adress: string;
    latitude!: string;
    longitude!: string;
    

    constructor() {
        this.uid = '';
        this.name = '';
        this.adminUID = '';
        this.schedule = [];

        //////info
        this.nit = '';
        this.logoBase64= '';
        this.phone= '';
        this.email= '';

        //////location
        this.state = '';
        this.city= '';
        this.adress= '';
        this.latitude= '';
        this.longitude= '';
       
        

    }
}