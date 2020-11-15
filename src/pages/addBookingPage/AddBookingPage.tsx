import css from "./AddBookingPage.module.less";
import React, {useEffect, useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {Router} from "../../lib/router/Router";
import {APIManager} from "../../helpers/APIManager";
import {IBooking} from "../../data/IBooking";
import {DEFAULT_BOOKING, DEFAULT_ROOM} from "../../data/DefaultDatas";
import {IRoom} from "../../data/IRoom";
import {IClient} from "../../data/IClient";
import RoomCard from "../../components/roomCard/RoomCard";

interface IProps {
  classNames?: string[];
}

const componentName = "AddBookingPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name AddBookingPage
 */
const AddBookingPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  const [room,setRoom] = useState<IRoom>(DEFAULT_ROOM);
  const [clients,setClients] = useState<IClient[]>([])
  // -------------------–-------------------–-------------------–--------------- USE EFFECT

    useEffect(()=>{
        let roomId = Router.currentRouteMatch.parameters.id as string;

        APIManager.instance.getRoom(roomId).then((pRoom)=>{
            setRoom(pRoom);
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
        <h1 className={css.pageTitle}>Book room n°{room?.number}</h1>
        <RoomCard data={room}/>
        <select>
            {

            }
        </select>
    </div>
  );
};

export default AddBookingPage;






