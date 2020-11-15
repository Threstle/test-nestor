import css from "./ClientsPage.module.less";
import React, {useEffect, useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {IApartment} from "../../data/IApartment";
import {IClient} from "../../data/IClient";
import ClientCard from "../../components/clientCard/ClientCard";
import {APIManager} from "../../helpers/APIManager";
import {Router} from "../../lib/router/Router";

interface IProps {
  classNames?: string[];
}

const componentName = "ClientsPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ClientsPage
 */
const ClientsPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

    const [clients,setClients] = useState<IClient[]>([]);


    // -------------------–-------------------–-------------------–--------------- USE EFFECT

    useEffect(()=>{
        APIManager.instance.getClients().then((pClients:IClient[])=>{
            setClients(pClients);
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
        <h1 className={css.pageTitle}>Client list</h1>
        <div className={css.clientsList}>
            {
                clients?.map((client:IClient,i:number)=>{
                    return <ClientCard
                        className={css.clientCard}
                        key={i}
                        data={client}
                        onClick={()=>{
                            Router.openPage({page:'ClientPage',parameters:{id:client.id}})
                        }}
                    />
                })
            }
        </div>
    </div>
  );
};

export default ClientsPage;






