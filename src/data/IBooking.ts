import {IRoom} from "./IRoom";
import {IClient} from "./IClient";

export interface IBooking {
    id?: string;
    createdAt: string;
    updatedAt: string;
    client: IClient;
    room: IRoom;
}
