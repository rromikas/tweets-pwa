import React, { useState } from "react";
import { confirmable } from "react-confirm";
import { withStyles } from "@material-ui/core/styles";
import NewWindow from "react-new-window";
import { useFormik } from "formik";
import Button from "components/Button";
import * as Yup from "yup";

const styles = {
  confirmDialogPaper: {
    width: "auto",
    padding: "20px",
  },
};

const Captcha = ({ proceed }) => {
  const [open, setOpen] = useState(true);
  const [captchaCode] = useState("A4E3s5");
  const { values, errors, handleSubmit, handleChange, submitCount } = useFormik({
    initialValues: { captcha: "" },
    validationSchema: Yup.object().shape({
      captcha: Yup.string()
        .required("required")
        .test({ test: (val) => val === captchaCode, message: "Try again" }),
    }),
    onSubmit: (values) => {
      proceed(true);
      setOpen(false);
    },
  });

  return open ? (
    <NewWindow copyStyles features={{ width: 650, height: 396 }} onUnload={() => proceed(false)}>
      <div className="fixed left-0 top-0 w-full h-full bg-blue-1000 p-7 font-bold text-white">
        <div className="h-48 w-full text-blue-900 rounded-md bg-blue-600 mb-3 flex justify-center items-center font-bold text-6xl">
          {captchaCode}
        </div>
        <div className="flex justify-between mb-2">
          <div>Enter Captcha</div>
          {errors.captcha && submitCount > 0 ? (
            <div className="text-red-500">{errors.captcha}</div>
          ) : null}
        </div>
        <input
          type="text"
          placeholder="Enter Captcha"
          className={`px-3 mb-7 py-2 rounded-xl text-white outline-none w-full bg-blue-600 ${
            values.captcha ? "font-medium" : "font-bold"
          }`}
          name="captcha"
          value={values.captcha}
          onChange={handleChange}
        ></input>
        <div className="flex justify-center">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </NewWindow>
  ) : (
    ""
  );
};

export default confirmable(withStyles(styles)(Captcha));
