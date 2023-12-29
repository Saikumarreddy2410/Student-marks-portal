import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../Constants/TextError";

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name} className="font-semibold">
        {label}
        <span className="text-[#D00000]">*</span>
      </label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
