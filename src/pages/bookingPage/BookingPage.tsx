import css from "./BookingPage.module.less";
import React, {useEffect, useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {Router} from "../../lib/router/Router";
import {APIManager} from "../../helpers/APIManager";
import {IClient} from "../../data/IClient";
import {IBooking} from "../../data/IBooking";
import {DEFAULT_BOOKING} from "../../data/DefaultDatas";
import ClientCard from "../../components/clientCard/ClientCard";
import RoomCard from "../../components/roomCard/RoomCard";

interface IProps {
  classNames?: string[];
}

const componentName = "BookingPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name BookingPage
 */
const BookingPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  const [booking,setBooking] = useState<IBooking>(DEFAULT_BOOKING);

  useEffect(()=>{
      let id = Router.currentRouteMatch.parameters.id as string;

      APIManager.instance.getBooking(id).then((pBooking)=>{
          setBooking(pBooking);
      })
  },[]);
  // -------------------–-------------------–-------------------–--------------- REGISTER PAGE

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
        <h1 className={css.pageTitle}>Booking created at : {booking?.createdAt}</h1>
        <h3 className={css.sectionTitle}>Client :</h3>
        {/* Ideally we would acces the client page by clicking on the client card but the API doesn't return the client ID.*/}
        <ClientCard className={css.card} data={booking?.client}/>
        <h3 className={css.sectionTitle}>Room :</h3>
        <RoomCard className={css.card} data={booking?.room}/>
    </div>
  );
};

export default BookingPage;






