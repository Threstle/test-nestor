import css from "./AddClientPage.module.less";
import React, { useRef } from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import CustomButton from "../../components/customButton/CustomButton";
import {APIManager} from "../../helpers/APIManager";
import {IClient} from "../../data/IClient";
import {Router} from "../../lib/router/Router";

interface IProps {
  classNames?: string[];
}

const componentName = "AddClientPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name AddClientPage
 */
const AddClientPage = (props: IProps) => {
  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const sendForm = ()=>{
      let formData = new FormData(formRef.current);

      let client = {};
      formData.forEach(function(value, key){
          client[key] = value;
      });

      APIManager.instance.addClient(client as IClient).then((res)=>{
          console.log(res);
          Router.openPage({page:"ClientsPage"});
      })

  };

  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.Root} ref={rootRef}>
        <h1 className={css.pageTitle}>Add client</h1>
        <form ref={formRef} className={css.form}>
            <label>First name</label>
            <input type="text" name="firstname"/>
            <label>Last name</label>
            <input type="text" name="lastname"/>
            <label>Email</label>
            <input type="email" name="email"/>
            <label>Phone</label>
            <input type="phone" name="phone"/>
            <label>Nationality</label>
            <input type="text" name="nationality"/>
            <div className={css.buttons}>
                <CustomButton
                    onClick={sendForm}
                    text={"Submit"}
                />
            </div>
        </form>
    </div>
  );
};

export default AddClientPage;






