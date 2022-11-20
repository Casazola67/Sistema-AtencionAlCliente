
export class Request {

    id?: string;
    userUID: string;
    nameUser!: string;
    nameOrganization: string;
    visible: boolean;
    nitBase64: string;
    seprecBase64: string;


    constructor() {
        this.id = '';
        this.userUID = '';
        this.nameUser = '';
        this.nameOrganization = '';
        this.visible = true; 
        this.nitBase64 = '';
        this.seprecBase64 = '';

    }
}