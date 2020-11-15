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
import CustomButton from "../../components/customButton/CustomButton";

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
  const formRef = useRef<HTMLFormElement>(null);

  const [rooms,setRooms] = useState<IRoom[]>([]);
  const [clients,setClients] = useState<IClient[]>([])
  // -------------------–-------------------–-------------------–--------------- USE EFFECT

    useEffect(()=>{

        APIManager.instance.getRooms().then((pRoom)=>{
            setRooms(pRoom);
        })

        APIManager.instance.getClients().then((pClients)=>{
            setClients(pClients);
        })
    },[]);

  // -------------------–-------------------–-------------------–--------------- FUNCTIONS

    const sendForm = ()=>{
        let formData = new FormData(formRef.current);

        let booking = {};
        formData.forEach(function(value, key){
            booking[key] = value;
        });

        console.log(booking);
        APIManager.instance.addBooking(booking as IBooking).then((res)=>{
            console.log(res);
            Router.openPage({page:"BookingsPage"});
        })

    };
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
        <h1 className={css.pageTitle}>Add Booking</h1>
        <form ref={formRef} className={css.form}>
            <label className={css.label}>Client</label>
            <select name="clientId" className={css.select}>
                {
                    clients.map((client,i)=>{
                        return <option value={client.id}>{client.firstName} {client.lastName}</option>
                    })
                }
            </select>
            <label className={css.label}>Room</label>
            <select name="roomId" className={css.select}>
                {
                    rooms.map((room,i)=>{
                        return <option value={room.id}>{room.number} - {room.price} €</option>
                    })
                }
            </select>
            <div className={css.buttons}>
                <CustomButton
                    text={"Submit"}
                    onClick={sendForm}
                />
            </div>
        </form>
    </div>
  );
};

export default AddBookingPage;






