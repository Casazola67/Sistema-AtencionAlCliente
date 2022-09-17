export class Organization {

    id?: string;
    name?: string;
    adress?: string;
    phone?: string;
    city?: string;
    services?: string;
    tags?: string[];
    admin?: {idUser: string, nameUser: string};
    partners?: { id: string, name: string}[];
    links?: string[];
    schedule?: { day: string, startTime: string, endTime: string, interval: number}[]

    constructor() {
        this.id = '';
        this.name = '';
        this.adress = '';
        this.phone = ''; 
        this.city = '';
        this.services = '';
        this.tags = [];
        this.admin = {idUser: '', nameUser: ''};
        this.partners = [];
        this.links = [];
        this.schedule = [];

    }
}