import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class Schedule {

    day: number;
    
    open_half: boolean;
    from_half: string;
    to_half: string;

    open_full: boolean;
    from_full: string;
    to_full: string;


    constructor(){

        this.day = 0;

        this.open_half = true;
        this.from_half = '';
        this.to_half = '';
        
        this.open_full = true;
        this.from_full = '';
        this.to_full = '';
    }

}