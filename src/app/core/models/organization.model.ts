import { Schedule } from "./schedule.model";

export class Organization {

    id?: string;
    name?: string;
    adress?: string;
    phone?: string;
    city?: string;
    admin?: string;
    partners?: string[];
    schedule?: Schedule[];

    constructor() {
        this.id = '';
        this.name = '';
        this.adress = '';
        this.phone = ''; 
        this.city = '';
        this.admin = '';
        this.partners = [];
        this.schedule = [];

    }
}