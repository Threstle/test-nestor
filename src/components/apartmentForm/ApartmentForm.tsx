import css from './ApartmentForm.module.less';
import React, {useEffect, useRef, useState} from 'react';
import { mergeStrings as merge } from "../../lib/utils/stringUtils";
import {IRoom} from "../../data/IRoom";
import {IApartment} from "../../data/IApartment";
import {APIManager} from "../../helpers/APIManager";
import {Router} from "../../lib/router/Router";
import CustomButton from "../customButton/CustomButton";
import {DEFAULT_ROOM} from "../../data/DefaultDatas";

interface IProps {
  className?: string
}

const componentName = "ApartmentForm";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ApartmentForm
 */
function ApartmentForm (props: IProps) {
  // --------------------------------------------------------------------------- PREPARE

    const nameRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);
    const roomsRef = useRef<HTMLDivElement[]>([]);

    const [rooms,setRooms] = useState<IRoom[]>([
        DEFAULT_ROOM
    ]);



  // --------------------------------------------------------------------------- USE EFFECT


  // --------------------------------------------------------------------------- FUNCTIONS


  const addRoom = (e)=>{
      e.preventDefault();
    setRooms([...rooms,DEFAULT_ROOM]);
  };

  const removeRoom = (e,pId)=>{
      e.preventDefault();

      let tempArray = [...rooms]
      tempArray.splice(pId,1);
    setRooms(tempArray)
  };

  const sendForm = (e)=>{
      e.preventDefault();

      let roomValues = [];

      roomsRef.current.forEach((el)=>{

          if(el){

          roomValues.push({
              number:el.getElementsByClassName("room-number")[0]['value'],
              area:el.getElementsByClassName("room-area")[0]['value'],
              price:el.getElementsByClassName("room-price")[0]['value']
          })
          }
      });

      let apartment = {
          name:nameRef.current.value,
          number:numberRef.current.value,
          rooms:roomValues
      }

      APIManager.instance.addApartment(apartment).then((res)=>{
          Router.openPage({page:"ApartmentsPage"});
      })

  };


  // --------------------------------------------------------------------------- RENDER

  return <div className={merge([css.Root, props.className])}>
      <form className={css.form}>
          <label>Number</label>
          <input ref={numberRef} type="number" name="number"/>
          <label>Name</label>
          <input ref={nameRef} type="text" name="name"/>
          <div className={css.roomBlocks}>
              {
                  rooms.map((room,i)=>{
                      return <div className={css.roomBlock} key={i}>
                              {
                                  rooms.length > 1 &&
                                  <button className={css.roomDeleteButton} onClick={(e)=> removeRoom(e,i)}>X</button>
                              }
                          <div className={css.roomInputs} ref={(el)=>{roomsRef.current[i] = el}}>
                              <h3 className={css.sectionTitle}>Room</h3>
                              <label>Number</label>
                              <input type="number" className={"room-number"} name={`room-${i}-number`}/>
                              <label>Price</label>
                              <input type="number" className={"room-price"} name={`room-${i}-price`}/>
                              <label>Area</label>
                              <input type="text" className={"room-area"} name={`room-${i}-area`}/>
                          </div>
                      </div>
                  })
              }
          </div>
          <div className={css.buttons}>
              <CustomButton
                onClick={addRoom}
                text={"Add room"}
              />
              <CustomButton
                  onClick={sendForm}
                  text={"Submit"}
              />
          </div>
      </form>
  </div>
}

export default ApartmentForm
