import React from "react";
import { useFormik } from "formik";
import Button from "components/Button";
import * as Yup from "yup";

const AddTwitterDevKeysForm = ({ onClose, twitterDevKeys, onSaveKeys }) => {
  const { values, handleSubmit, handleChange, errors, submitCount } = useFormik({
    onSubmit: (values, { resetForm }) => {
      onSaveKeys(values);
      onClose();
    },
    initialValues: {
      consumer_api_key: "",
      consumer_secret_api_key: "",
      access_token: "",
      access_token_secret: "",
      ...twitterDevKeys,
    },
    validationSchema: Yup.object().shape({
      consumer_api_key: Yup.string().typeError("Not string"),
      consumer_secret_api_key: Yup.string().typeError("Not string"),
      access_token: Yup.string().typeError("Not string"),
      access_token_secret: Yup.string().typeError("Not string"),
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
        <div className="text-center text-xl mb-7">Add Twitter Dev Keys</div>
        <div className="flex justify-between">
          <div>Consumer API Key</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.consumer_api_key ? errors.consumer_api_key : ""}
          </div>
        </div>
        <input
          placeholder="Enter Key"
          spellCheck={false}
          type="text"
          name="consumer_api_key"
          value={values.consumer_api_key}
          onChange={handleChange}
          className="bg-blue-700 mb-5 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>
        <div className="flex justify-between">
          <div>Consumer Secret API Key</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.consumer_secret_api_key
              ? errors.consumer_secret_api_key
              : ""}
          </div>
        </div>
        <input
          placeholder="Enter Key"
          spellCheck={false}
          type="text"
          name="consumer_secret_api_key"
          value={values.consumer_secret_api_key}
          onChange={handleChange}
          className="bg-blue-700 mb-5 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>
        <div className="flex justify-between">
          <div>Access Token</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.access_token ? errors.access_token : ""}
          </div>
        </div>
        <input
          placeholder="Enter Key"
          spellCheck={false}
          type="text"
          name="access_token"
          value={values.access_token}
          onChange={handleChange}
          className="bg-blue-700 mb-5 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>
        <div className="flex justify-between">
          <div>Access Token Secret</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.access_token_secret ? errors.access_token_secret : ""}
          </div>
        </div>
        <input
          placeholder="Enter Key"
          spellCheck={false}
          type="text"
          name="access_token_secret"
          value={values.access_token_secret}
          onChange={handleChange}
          className="bg-blue-700 mb-5 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>

        <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTwitterDevKeysForm;
