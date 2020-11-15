import {IRoom} from "./IRoom";

export interface IApartment {
    id?: string;
    number: string;
    name: string;
    rooms:IRoom[];
}
