import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import TextError from "./TextError";
import { CommonContext } from "../../../context/CommonContextApi";

function RadioButtons(props) {
  const { label, name, options, level, ...rest } = props;

  const [isChecked, setIsChecked] = React.useState("");

  const [field] = useField(props);

  const { allSelect } = React.useContext(CommonContext);

  // console.log(field);

  React.useEffect(() => {
    console.log(isChecked);
    if (isChecked !== undefined) {
      // console.log(field);
      allSelect(isChecked, name, level);
    }
  }, [isChecked]);

  return (
    <>
      <div className={rest.classForField}>
        {/* <label>{label}</label> */}
        <Field name={name}>
          {({ field }) => {
            let fields = field.value || "CNR_NO";
            // console.log(fields);
            setIsChecked(fields);
            return options.map((option) => {
              return (
                <div className="form-check">
                  <React.Fragment key={option.key}>
                    <input
                      type="radio"
                      className="form-check-input"
                      id={option.value}
                      {...field}
                      {...rest}
                      value={option.value}
                      checked={fields === option.value}
                    />
                    <label className="form-check-label" htmlFor={option.value}>
                      {option.key}
                    </label>
                  </React.Fragment>
                </div>
              );
            });
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </>
  );
}

export default RadioButtons;
