import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <div className={rest.classForField}>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Field
          as="textarea"
          id={name}
          className="form-control"
          name={name}
          {...rest}
        />
        <ErrorMessage component={TextError} name={name} />
      </div>
    </div>
  );
}

export default Textarea;
