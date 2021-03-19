import React from "react";
import { useFormik } from "formik";
import WarningIcon from "assets/Warning.png";
import { v4 as uuidv4 } from "uuid";
import Button from "components/Button";

const ProfileForm = ({ onClose, onCreateSubmit, onEditSubmit, initialData }) => {
  const formik = useFormik({
    initialValues: initialData || {
      id: uuidv4(),
      discord_token: null,
      create: true,
      profile_name: "",
      first_name: "",
      last_name: "",
      email: "",
      card_number: "",
      postal_code: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (values.create) {
        onCreateSubmit(values);
      } else {
        onEditSubmit(values);
      }
      resetForm();
    },
  });

  return (
    <div className="w-full h-full flex  bg-blue-700 bg-opacity-10 overflow-auto" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full m-auto py-3 px-20 rounded-xl bg-blue-1000 text-white font-semibold"
      >
        <div className="text-xl text-center mb-8">
          {formik.values.create ? "Create Profile" : "Edit Profile"}
        </div>
        <form className="mx-auto" onSubmit={formik.handleSubmit}>
          <div className="flex flex-wrap">
            <div className="sm:w-1/3 w-full sm:pr-2 mb-3">
              <div className="flex mb-2 items-center">
                <div className="mr-3">Profile Name</div>
                {formik.errors.profile_name && formik.touched.profile_name ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_name}
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="profile_name"
              ></input>
            </div>
            <div className="sm:w-1/3 w-full sm:pr-2 sm:pl-2 mb-3">
              <div className="flex mb-2 items-center">
                <div className="mr-3">First Name</div>
                {formik.errors.first_name && formik.touched.first_name ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="first_name"
              ></input>
            </div>
            <div className="sm:w-1/3 w-full sm:pl-2 mb-3">
              <div className="flex mb-2 items-center">
                <div className="mr-3">Last Name</div>
                {formik.errors.last_name && formik.touched.last_name ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                onChange={formik.handleChange}
                value={formik.values.last_name}
                type="text"
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="last_name"
              ></input>
            </div>
          </div>
          <div className="w-full mb-3">
            <div className="flex mb-2 items-center">
              <div className="mr-3">Email</div>
              {formik.errors.email && formik.touched.email ? (
                <img
                  alt="required"
                  src={WarningIcon}
                  className="max-w-5 max-h-5 w-auto h-auto"
                ></img>
              ) : null}
            </div>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
              name="email"
            ></input>
          </div>
          <div className="flex mb-3">
            <div className="w-2/3 pr-2">
              <div className="flex mb-2 items-center">
                <div className="mr-3">Credit Card</div>
                {formik.errors.card_number && formik.touched.card_number ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                onChange={formik.handleChange}
                value={formik.values.card_number}
                type="text"
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="card_number"
              ></input>
            </div>
            <div className="w-1/3 pl-2">
              <div className="flex mb-2 items-center">
                <div className="mr-3">Postal Code</div>
                {formik.errors.postal_code && formik.touched.postal_code ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                onChange={formik.handleChange}
                value={formik.values.postal_code}
                type="text"
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="postal_code"
              ></input>
            </div>
          </div>
          <div className="flex mb-12">
            <div className="w-1/3 pr-2">
              <div className="flex mb-2 items-center">
                <div className="mr-3">Month</div>
                {formik.errors.exp_month && formik.touched.exp_month ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                onChange={formik.handleChange}
                value={formik.values.exp_month}
                type="text"
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="exp_month"
              ></input>
            </div>
            <div className="w-1/3 pl-2 pr-2">
              <div className="flex mb-2 items-center">
                <div className="mr-3">Year</div>
                {formik.errors.exp_year && formik.touched.exp_year ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                onChange={formik.handleChange}
                value={formik.values.exp_year}
                type="text"
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="exp_year"
              ></input>
            </div>
            <div className="w-1/3 pl-2">
              <div className="flex mb-2 items-center">
                <div className="mr-3">CVC</div>
                {formik.errors.cvc && formik.touched.cvc ? (
                  <img
                    alt="required"
                    src={WarningIcon}
                    className="max-w-5 max-h-5 w-auto h-auto"
                  ></img>
                ) : null}
              </div>
              <input
                onChange={formik.handleChange}
                value={formik.values.cvc}
                type="text"
                className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
                name="cvc"
              ></input>
            </div>
          </div>
          <div className="flex justify-center select-none mb-4">
            <Button className="text-xl h-11 w-44 mx-1">Discord</Button>
            <Button className="text-xl h-11 w-44 mx-1" type="submit">
              {formik.values.create ? "Create" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
