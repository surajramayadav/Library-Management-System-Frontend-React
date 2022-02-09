import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const Input = ({ label, name, value, ...rest }) => {
  return (
    <>
      <div className={rest.classForField}>
        <div className="form-group">
          {/* <label htmlFor={name}>{label}</label> */}
          <Field
            className="input"
            id={name}
            placeholder={label}
            className="form-control"
            name={name}
            {...rest}
          />

          <ErrorMessage name={name} component={TextError} />
        </div>
      </div>
    </>
  );
};

export default Input;
