import React from "react";
import HandBig from "assets/Hand.png";
import ArrowRight from "assets/ArrowRight.png";
import Logo from "components/Logo";
import Toolbar from "components/Toolbar";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const history = useHistory();
  const { values, errors, handleSubmit, submitCount, handleChange } = useFormik({
    initialValues: { licenceKey: "" },
    onSubmit: () => history.push("/"),
    validationSchema: Yup.object().shape({
      licenceKey: Yup.string().required("Required").max(20, "20 symbols max"),
    }),
  });
  return (
    <div className="fixed top-0 left-0 w-full h-full flex overflow-auto p-7">
      <div className="absolute top-0 left-0 w-full flex justify-between p-4 items-start">
        <Logo></Logo>
        <Toolbar></Toolbar>
      </div>
      <div className="m-auto flex flex-wrap items-center max-w-5xl w-full">
        <img
          alt="logo"
          className="md:w-80 w-64 mx-auto md:mx-0 md:mr-20 mb-7 md:mb-0"
          src={HandBig}
        ></img>
        <div className="text-white font-bold flex-grow w-full md:w-auto pb-28">
          <div className="flex justify-between mb-2">
            <div>Enter Licence Key</div>
            {errors.licenceKey && submitCount > 0 ? (
              <div className="text-red-500">{errors.licenceKey}</div>
            ) : null}
          </div>
          <div className="flex items-center">
            <input
              spellCheck={false}
              value={values.licenceKey}
              onChange={handleChange}
              name="licenceKey"
              type="text"
              placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
              className={`py-3 px-5 rounded-xl bg-blue-600 w-full outline-none mr-3 placeholder-gray-500 ${
                values.licenceKey ? "font-medium" : "font-bold"
              }`}
            ></input>
            <img
              alt="submit"
              className="w-8 cursor-pointer"
              src={ArrowRight}
              onClick={handleSubmit}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
