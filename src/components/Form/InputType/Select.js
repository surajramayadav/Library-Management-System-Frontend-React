import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import TextError from "./TextError";
import { CommonContext } from "../../../context/CommonContextApi";
import "../FormikContainer.css";

function Select(props) {
  const { label, name, options, level, ...rest } = props;

  const [field] = useField(props);

  const { show, close, setShow, allSelect } = React.useContext(CommonContext);

  React.useEffect(() => {
    if (field.value !== undefined) {
      console.log(field.value);
      allSelect(field.value, name, level);
    }
  }, [field.value]);

  // console.log(props);
  return (
    <div className={rest.classForField[0].inputBox}> 
      <div className="form-group">
        {/* <label htmlFor={name}>{label}</label> */}
        <Field
          as="select"
          id={name}
          name={name}          
          className={`form-control ${rest.classForField[0].inputSelect}`}

          // onChange={(e) => setMyselect(e.target.value)}
          {...rest}
        >
          {options.map((option, index) => {
            // console.log(option);

            if (index === 0) {
              return (
                <option key={option.value} value={option.value} selected>
                  {option.key}
                </option>
              );
            }

            return (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          })}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </div>
  );
}

export default Select;
