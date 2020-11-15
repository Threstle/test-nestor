import css from './ClientCard.module.less';
import React from 'react';
import { mergeStrings as merge } from "../../lib/utils/stringUtils";
import {IClient} from "../../data/IClient";

interface IProps {
  className?: string;
  data:IClient;
  onClick?:any;
}

const componentName = "ClientCard";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ClientCard
 */
function ClientCard (props: IProps) {
  // --------------------------------------------------------------------------- PREPARE

  // --------------------------------------------------------------------------- RENDER

  return <div onClick={props.onClick} className={merge([css.Root, props.className])}>
      <p className={css.title}>{props?.data?.firstName} {props?.data?.lastName}</p>
  </div>
}

export default ClientCard
