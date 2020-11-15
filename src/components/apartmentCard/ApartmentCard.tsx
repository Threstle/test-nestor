import css from './ApartmentCard.module.less';
import React from 'react';
import { mergeStrings as merge } from "../../lib/utils/stringUtils";
import {IApartment} from "../../data/IApartment";

interface IProps {
  className?: string;
  data: IApartment;
  onClick?:()=>void;
}

const componentName = "ApartmentCard";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ApartmentCard
 */
function ApartmentCard (props: IProps) {
  // --------------------------------------------------------------------------- PREPARE

  // --------------------------------------------------------------------------- RENDER

  return <div
      className={merge([css.Root, props.className])}
      onClick={props.onClick}
  >
      <p className={css.title}>{props.data.name} - {props.data.number}</p>
  </div>
}

export default ApartmentCard
