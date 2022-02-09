import React from "react";

import { Formik, Form } from "formik";
import FormikControl from "./FormikControl";
import "./FormikContainer.css";

const FormikContainer = ({ inputData, onSubmit }) => {
  console.log(inputData);
  // const loginData = {
  //   formData: [
  //     { name: "email", type: "email", control: "input", label: "Email" },
  //     {
  //       name: "password",
  //       type: "password",
  //       control: "input",
  //       label: "Password",
  //     },
  //     //   {
  //     //     name: "selectOption",
  //     //     control: "select",
  //     //     label: "Select a topic",
  //     //     options: [
  //     //       { key: "Select an option", value: "" },
  //     //       { key: "Option 1", value: "option1" },
  //     //       { key: "Option 2", value: "option2" },
  //     //       { key: "Option 3", value: "option3" },
  //     //     ],
  //     //   },
  //   {
  //     name: "radioOption",
  //     type: "radio",
  //     control: "radio",
  //     label: "Radio Topic",
  //     options: [
  // { key: "Option 1", value: "option1" },
  // { key: "Option 2", value: "option2" },
  // { key: "Option 3", value: "option3" },
  //     ],
  //   },
  //   ],
  // };

  const validateInput = (value) => {
    let error;
    if (!value) {
      error = "Required";
    }

    return error;
  };

  //   const validationSchema = Yup.object({
  //     email: Yup.string().required("Required"),
  //   });

  return (
    <Formik
      enableReinitialize
      initialValues={inputData.initialInput || {}}
      //   validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            {/* <div className={inputData.columns} style={{width : "500px"}}> */}
            {inputData.formData.map((value) => {
              console.log(value);
              return (
                <>
                  {!value.hideField && (
                    <FormikControl
                      control={value.control}
                      type={value.type}
                      label={value.label}
                      name={value.name}
                      options={value.options}
                      validate={validateInput}
                      level={value.level}
                      checked={value.checked}
                      classForField={inputData.classForField}
                    />
                  )}
                </>
              );
            })}
            {/* </div> */}
            {/* <div className="col-md-12" style={{ textAlign: "center" }}>
              <button
                className="btn "
                style={{ backgroundColor: "#e91e63", color: "white" }}
                type="submit"
              >
                <b>Submit</b>
              </button>
            </div> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(FormikContainer);
