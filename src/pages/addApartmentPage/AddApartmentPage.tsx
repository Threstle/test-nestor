import css from "./AddApartmentPage.module.less";
import React, { useRef } from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import ApartmentForm from "../../components/apartmentForm/ApartmentForm";

interface IProps {
  classNames?: string[];
}

const componentName = "AddApartmentPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name AddApartmentPage
 */
const AddApartmentPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

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
        <h1 className={css.pageTitle}>Add apartment</h1>
        <ApartmentForm
            className={css.apartmentForm}
        />
    </div>
  );
};

export default AddApartmentPage;






