import css from './BookingCard.module.less';
import React from 'react';
import { mergeStrings as merge } from "../../lib/utils/stringUtils";
import {IBooking} from "../../data/IBooking";

interface IProps {
  className?: string;
  data:IBooking;
  onClick?:any;
}

const componentName = "BookingCard";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name BookingCard
 */
function BookingCard (props: IProps) {
  // --------------------------------------------------------------------------- PREPARE

  // --------------------------------------------------------------------------- RENDER

  return <div onClick={props.onClick} className={merge([css.Root, props.className, props.onClick?css.Root_clickable:""])}>
      <p className={css.title}>Room n°{props.data.room.number} by {props.data.client.firstName} {props.data.client.lastName}</p>
  </div>
}

export default BookingCard
