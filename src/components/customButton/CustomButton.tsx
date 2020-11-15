import css from './CustomButton.module.less';
import React from 'react';
import { mergeStrings as merge } from "../../lib/utils/stringUtils";

interface IProps {
  className?: string
  text?: string
  onClick?:any;
}

const componentName = "CustomButton";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name CustomButton
 */
function CustomButton (props: IProps) {
  // --------------------------------------------------------------------------- PREPARE

  // --------------------------------------------------------------------------- RENDER

  return <div
      onClick={props.onClick}
      className={merge([css.Root, props.className])}>
        <p>{props.text}</p>
  </div>
}

export default CustomButton
