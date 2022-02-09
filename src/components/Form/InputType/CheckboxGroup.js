import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props;
  return (
    <>
      {/* <label>{label}</label> */}
      <div className={rest.classForField}>
        <Field name={name}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={option.value}
                      {...field}
                      {...rest}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                    />
                    <label className="form-check-label" htmlFor={option.value}>
                      {option.key}
                    </label>
                  </div>
                </React.Fragment>
              );
            });
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </>
  );
}

export default CheckboxGroup;
