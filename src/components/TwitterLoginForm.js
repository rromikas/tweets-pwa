import React from "react";
import { useFormik } from "formik";
import Button from "components/Button";
import * as Yup from "yup";

const AddTwitterAccount = ({ onAddTwitter, onClose }) => {
  const { values, handleSubmit, handleChange, errors, submitCount } = useFormik({
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      onAddTwitter(values);
      onClose();
    },
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
  });
  return (
    <div
      className="w-full h-full flex bg-blue-900 bg-opacity-50 overflow-auto"
      onMouseDown={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="text-white font-semibold m-auto bg-blue-900 rounded max-w-lg w-full px-16 py-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="text-center text-xl mb-7">Add Twitter Account</div>
        <div className="flex justify-between mb-2">
          <div>Username / Email</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.username ? errors.username : ""}
          </div>
        </div>
        <input
          placeholder="youremail@gmail.com"
          spellCheck={false}
          type="text"
          name="username"
          value={values.baseUrl}
          onChange={handleChange}
          className="bg-blue-700 mb-5 font-bold placeholder-gray-500 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>
        <div className="flex justify-between mb-2">
          <div>Password</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.password ? errors.password : ""}
          </div>
        </div>
        <input
          spellCheck={false}
          style={{ fontFamily: values.password.length ? "sans-serif" : "Jost" }}
          type="password"
          placeholder="Password"
          value={values.password}
          name="password"
          onChange={handleChange}
          className="bg-blue-700 font-bold placeholder-gray-500 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>
        <div className="flex justify-center">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTwitterAccount;
