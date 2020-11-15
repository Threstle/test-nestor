import css from './RoomCard.module.less';
import React from 'react';
import { mergeStrings as merge } from "../../lib/utils/stringUtils";
import {IRoom} from "../../data/IRoom";

interface IProps {
  className?: string;
  data: IRoom;
  onClick?:any;
}

const componentName = "RoomCard";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name RoomCard
 */
function RoomCard (props: IProps) {
  // --------------------------------------------------------------------------- PREPARE

  // --------------------------------------------------------------------------- RENDER

  return <div onClick={props.onClick} className={merge([css.Root, props.className, (props.onClick)?css.Root_clickable:""])}>
      <div className={css.line}><p className={css.valueTitle}>Area : </p><p className={css.value}>{props.data.area}</p></div>
      <div className={css.line}><p className={css.valueTitle}>Number : </p><p className={css.value}>{props.data.number}</p></div>
      <div className={css.line}><p className={css.valueTitle}>Price : </p><p className={css.value}>{props.data.price}</p></div>
  </div>
}

export default RoomCard
