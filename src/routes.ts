import { IRoute } from "./lib/router/Router";

/**
 * Routes list
 */
export const routes: IRoute[] = [
  {
    url: "/",
    page: "ApartmentsPage",
    importer: () => require("./pages/apartmentsPage/ApartmentsPage"),
  },
  {
    url: "/apartment/{id}",
    page: "ApartmentPage",
    importer: () => require("./pages/apartmentPage/ApartmentPage"),
  },
  {
    url: "/add-apartment",
    page: "AddApartmentPage",
    importer: () => require("./pages/addApartmentPage/AddApartmentPage"),
  },
  {
    url: "/clients",
    page: "ClientsPage",
    importer: () => require("./pages/clientsPage/ClientsPage"),
    },
    {
        url: "/client/{id}",
        page: "ClientPage",
        importer: () => require("./pages/clientPage/ClientPage"),
    },
    {
        url: "/add-client",
        page: "AddClientPage",
        importer: () => require("./pages/addClientPage/AddClientPage"),
    },
    {
        url: "/bookings",
        page: "BookingsPage",
        importer: () => require("./pages/bookingsPage/BookingsPage"),
    },
    {
        url: "/booking/{id}",
        page: "BookingPage",
        importer: () => require("./pages/bookingPage/BookingPage"),
    },
    {
        url: "/add-booking/{id}",
        page: "AddBookingPage",
        importer: () => require("./pages/addBookingPage/AddBookingPage"),
    }
];
