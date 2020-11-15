import {IBooking} from "./IBooking";

export interface IClient {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    birthDate: string;
    bookings:IBooking[];
}
