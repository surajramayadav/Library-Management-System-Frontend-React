import React from "react";
import Input from "./InputType/Input";
import Textarea from "./InputType/Textarea";
import Select from "./InputType/Select";
import RadioButtons from "./InputType/RadioButtons";
import CheckboxGroup from "./InputType/CheckboxGroup";
import DatePicker from "./InputType/DatePicker";
import ChakraInput from "./InputType/ChakraInput";

const FormikControl = ({ control, ...rest }) => {
  console.log(rest)
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "chakraInput":
      return <ChakraInput {...rest} />;
    default:
      console.log("default");
      return null;
  }
};

export default FormikControl;
