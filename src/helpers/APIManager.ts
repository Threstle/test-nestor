import GlobalConfig from "../data/GlobalConfig";
import {IApartment} from "../data/IApartment";
import {IRoom} from "../data/IRoom";
import {IBooking} from "../data/IBooking";
import {IClient} from "../data/IClient";

//TODO: passer dans un .env
const API_URL = "https://app-booking-christ.herokuapp.com/api/";
const API_ENDPOINT_APARTMENTS = `${API_URL}apartment`;
const API_ENDPOINT_APARTMENT = `${API_URL}apartment/:id`;
const API_ENDPOINT_CLIENTS = `${API_URL}client`;
const API_ENDPOINT_CLIENT = `${API_URL}client/:id`;
const API_ENDPOINT_BOOKINGS = `${API_URL}booking`;
const API_ENDPOINT_BOOKING = `${API_URL}booking/:id`;
const API_ENDPOINT_ROOMS = `${API_URL}room`;
const API_ENDPOINT_ROOM = `${API_URL}room/:id`;

export class APIManager {
    protected static __instance: APIManager;

    /**
     * Singleton instance
     */
    static get instance(): APIManager {
        if (this.__instance == null)
            APIManager.__instance = new APIManager();

        return APIManager.__instance;
    }

    // ----------------------------------------------------------------------------------------------------------------- BOOKINGS

    public async getBookings() {
        let response = await fetch(API_ENDPOINT_BOOKINGS);
        let data = await response.json();
        return data.bookings as IBooking[];
    }

    public async getBooking(pBookingId) {
        let response = await fetch(API_ENDPOINT_BOOKING.replace(':id',pBookingId));
        let data = await response.json();
        return data.booking as IBooking;
    }

    public async addBooking(pBooking:IBooking){

        const response = await fetch(API_ENDPOINT_BOOKINGS,{
            method:'POST',
            body:JSON.stringify(pBooking),
            headers: {'Content-Type': 'application/json'}
        });

        return await response.json();
    }

    // ----------------------------------------------------------------------------------------------------------------- BOOKINGS

    public async getRooms() {
        let response = await fetch(API_ENDPOINT_ROOMS);
        let data = await response.json();
        return data.rooms as IRoom[];
    }

    // ----------------------------------------------------------------------------------------------------------------- CLIENTS

    public async getClients() {
        let response = await fetch(API_ENDPOINT_CLIENTS);
        let data = await response.json();
        return data.clients as IClient[];
    }

    public async getClient(pClientId:string) {
        let response = await fetch(API_ENDPOINT_CLIENT.replace(':id',pClientId));
        let data = await response.json();
        return data.client as IClient;
    }

    public async addClient(pClient:IClient){

        console.log(JSON.stringify(pClient));
        const response = await fetch(API_ENDPOINT_CLIENTS,{
            method:'POST',
            body:JSON.stringify(pClient),
            headers: {'Content-Type': 'application/json'}
        });


        return await response.json();
    }

    // ----------------------------------------------------------------------------------------------------------------- APARTMENTS

    public async getApartments() {
        let response = await fetch(API_ENDPOINT_APARTMENTS);
        let data = await response.json();
        return data.apartments as IApartment[];
    }

    public async getApartment(pApartmentId:string) {

        //FIXME: API_ENDPOINT_APARTMENT is returning a list of room in a "test" key. In order to get the apartments full infos we have to call API_ENDPOINT_APARTMENTS again and filter the right apartment from the list. This is obviously costly in terms of API call but I think the problem is server side.
        const apartments = await this.getApartments();

        const apartment = apartments.find(apartment => apartment.id === pApartmentId);
        const response = await fetch(API_ENDPOINT_APARTMENT.replace(':id',pApartmentId));
        const rooms =  await response.json();

        return {
            id:pApartmentId,
            number:apartment.number,
            name:apartment.name,
            //FIXME: why is this in a test key?
            rooms:rooms.test
        }
    }

    public async addApartment(pApartment:IApartment){

        const response = await fetch(API_ENDPOINT_APARTMENTS,{
            method:'POST',
            body:JSON.stringify(pApartment),
            headers: {'Content-Type': 'application/json'}
        });

        return await response.json();
    }

    // ----------------------------------------------------------------------------------------------------------------- ROOMS

    public async addRoom(pRoom:IRoom){

        const response = await fetch(API_ENDPOINT_ROOMS,{
            method:'POST',
            body:JSON.stringify(pRoom),
            headers: {'Content-Type': 'application/json'}
        });

        return await response.json();
    }

}
