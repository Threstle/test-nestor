import css from "./ClientPage.module.less";
import React, {useEffect, useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {DEFAULT_CLIENT} from "../../data/DefaultDatas";
import {Router} from "../../lib/router/Router";
import {APIManager} from "../../helpers/APIManager";
import {IClient} from "../../data/IClient";
import RoomCard from "../../components/roomCard/RoomCard";

interface IProps {
  classNames?: string[];
}

const componentName = "ClientPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ClientPage
 */
const ClientPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  const [client,setClient] = useState<IClient>(DEFAULT_CLIENT);

    // -------------------–-------------------–-------------------–--------------- USE EFFECT

    useEffect(()=>{

        let id = Router.currentRouteMatch.parameters.id as string;

        APIManager.instance.getClient(id).then((pClient)=>{
            setClient(pClient);
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
        <h1 className={css.pageTitle}>{client?.firstName} - {client?.lastName}</h1>
        <div className={css.container}>
            <div className={css.line}><p className={css.valueTitle}>Birthdate : </p><p className={css.value}>{client?.birthDate}</p></div>
            <div className={css.line}><p className={css.valueTitle}>Nationality : </p><p className={css.value}>{client?.nationality}</p></div>
            <div className={css.line}><p className={css.valueTitle}>Phone : </p><p className={css.value}>{client?.phone}</p></div>
            <div className={css.line}><p className={css.valueTitle}>Email : </p><p className={css.value}>{client?.email}</p></div>
            <h2 className={css.sectionTitle}>Bookings</h2>
            {
                client.bookings.map((booking)=>{
                    return <RoomCard data={booking.room}/>
                })
            }
        </div>
    </div>
  );
};

export default ClientPage;






