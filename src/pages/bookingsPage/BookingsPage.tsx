import css from "./BookingsPage.module.less";
import React, {useEffect, useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {IClient} from "../../data/IClient";
import {IBooking} from "../../data/IBooking";
import {APIManager} from "../../helpers/APIManager";
import ClientCard from "../../components/clientCard/ClientCard";
import {Router} from "../../lib/router/Router";
import BookingCard from "../../components/bookingCard/BookingCard";

interface IProps {
  classNames?: string[];
}

const componentName = "BookingsPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name BookingsPage
 */
const BookingsPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  // -------------------–-------------------–-------------------–--------------- USE EFFECT

    useEffect(()=>{
        APIManager.instance.getBookings().then((pBookings:IBooking[])=>{
            setBookings(pBookings);
        })
    },[]);

  // -------------------–-------------------–-------------------–--------------- REGISTER PAGE

  const [bookings,setBookings] = useState<IBooking[]>([]);

  /**
   * playIn page transition
   * (remove if not use)
   */
  const playIn = (): Promise<any> => {
    return new Promise<any>(resolve => resolve());
  };

  /**
   * playOut page transition
   * (remove if not use)
   */
  const playOut = (): Promise<any> => {
    return new Promise<any>(resolve => resolve());
  };

  /**
   * Register page for ViewStack
   * NOTE: each page of ViewStack need to be register to work.
   * Minimal register should be: usePageRegister({ componentName, rootRef });
   * (remove playIn and playOut if not use)
   */
  usePageRegister({ componentName, rootRef, playIn, playOut });

  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.Root} ref={rootRef}>
        <h1 className={css.pageTitle}>Bookings list</h1>
        <div className={css.clientsList}>
            {
                bookings?.map((booking:IBooking,i:number)=>{
                    return <BookingCard
                        className={css.clientCard}
                        key={i}
                        data={booking}
                        onClick={()=>{
                            Router.openPage({page:'BookingPage',parameters:{id:booking.id}})
                        }}
                    />
                })
            }
        </div>
    </div>
  );
};

export default BookingsPage;






