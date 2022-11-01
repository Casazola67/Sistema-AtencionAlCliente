import { Schedule } from "./schedule.model";

export class Organization {

    id?: string;
    name: string;
    adminUID: string;
    schedule: Schedule[];

    //////info
    nit: string;
    logoBase64!: string;
    phone: string;
    email: string;

    //////location
    state: string;
    city: string;
    adress: string;
    latitude!: string;
    longitude!: string;
    

    constructor() {
        this.id = '';
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