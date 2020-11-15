import css from "./ApartmentsPage.module.less";
import React, {useEffect, useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {APIManager} from "../../helpers/APIManager";
import {IApartment} from "../../data/IApartment";
import ApartmentCard from "../../components/apartmentCard/ApartmentCard";
import {Router} from "../../lib/router/Router";
import ApartmentForm from "../../components/apartmentForm/ApartmentForm";

interface IProps {
  classNames?: string[];
}

const componentName = "ApartmentsPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ApartmentsPage
 */
const ApartmentsPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  const [apartments,setApartments] = useState<IApartment[]>([]);

  // -------------------–-------------------–-------------------–--------------- USE EFFECT

    useEffect(()=>{
        APIManager.instance.getApartments().then((pApartments:IApartment[])=>{
            setApartments(pApartments);
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
        <h1 className={css.pageTitle}>Apartments list</h1>
        <div className={css.apartmentsList}>
        {
            apartments?.map((apartment:IApartment,i:number)=>{
                return <ApartmentCard
                    className={css.apartmentCard}
                    key={i}
                    data={apartment}
                    onClick={()=>{
                        Router.openPage({page:'ApartmentPage',parameters:{id:apartment.id}})
                    }}
                />
            })
        }
        </div>
    </div>
  );
};

export default ApartmentsPage;






