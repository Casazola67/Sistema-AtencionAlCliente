export class Ticket {
    id?: any;
    idOrganization: any;
    idUser?: any;
    nameUser?: any;
    date: string;
    hour: string;
    status: string;
    visible?: boolean;

    constructor() {
        this.id = '';
        this.idOrganization = '';
        this.idUser = '';
        this.nameUser = '';
        this.date = '';
        this.hour = '';
        this.status = '';
        this.visible = true;

    }
}