import css from "./ApartmentPage.module.less";
import React, {useEffect, useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {APIManager} from "../../helpers/APIManager";
import {IApartment} from "../../data/IApartment";
import {Router} from "../../lib/router/Router";
import RoomCard from "../../components/roomCard/RoomCard";
import CustomButton from "../../components/customButton/CustomButton";
import {DEFAULT_APARTMENT} from "../../data/DefaultDatas";

interface IProps {
  classNames?: string[];
}



const componentName = "ApartmentPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ApartmentPage
 */
const ApartmentPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);

  const [apartment,setApartment] = useState<IApartment>(DEFAULT_APARTMENT);

  // -------------------–-------------------–-------------------–--------------- USE EFFECT

    useEffect(()=>{

        let id = Router.currentRouteMatch.parameters.id as string;

        APIManager.instance.getApartment(id).then((pApartment)=>{
            setApartment(pApartment);
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


  // -------------------–-------------------–-------------------–--------------- FUNCTIONS

    const sendForm = (e)=>{
        e.preventDefault();

        let room = {
            number:numberRef.current.value,
            price:priceRef.current.value,
            area:areaRef.current.value,
            apartmentId:apartment.id
        }

        APIManager.instance.addRoom(room).then(()=>{
            APIManager.instance.getApartment(apartment.id).then((pApartment)=>{
                setApartment(pApartment);
            })
        });
    };


  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.Root} ref={rootRef}>
      <h1 className={css.pageTitle}>{apartment?.name} - {apartment?.number}</h1>
        <div className={css.rooms}>
            {
                apartment?.rooms?.map((room)=>{
                    return <RoomCard
                        /* FIXME: We should be able to click on a room to book it but the API is not returning any room id...*/
                        data={room}
                    />
                })
            }
        </div>
        <div className={css.roomFormContainer}>
            <h2 className={css.sectionTitle}>Add a room</h2>
            <form className={css.addRoomForm}>
                <label className={css.label}>Number</label>
                <input type="number" ref={numberRef} name={`number`}/>
                <label className={css.label}>Price</label>
                <input type="number" ref={priceRef} name={`price`}/>
                <label className={css.label}>Area</label>
                <input type="text" ref={areaRef} name={`area`}/>
                <div className={css.buttons}>
                    <CustomButton
                        onClick={sendForm}
                        text={"Submit"}
                    />
                </div>
            </form>
        </div>
    </div>
  );
};

export default ApartmentPage;






