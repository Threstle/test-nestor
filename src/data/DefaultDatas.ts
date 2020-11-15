import {IBooking} from "./IBooking";
import {IClient} from "./IClient";
import {IRoom} from "./IRoom";
import {IApartment} from "./IApartment";

export const DEFAULT_APARTMENT:IApartment = {
    id:"",
    name:"",
    number:"",
    rooms:[]
};

export const DEFAULT_ROOM:IRoom = {
    number:"",
    price:"0",
    area:""
};

export const DEFAULT_CLIENT:IClient = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    birthDate: "",
    bookings:[]
}

export const DEFAULT_BOOKING:IBooking = {
    createdAt:"",
    updatedAt: "",
    client:DEFAULT_CLIENT,
    room:DEFAULT_ROOM
}
