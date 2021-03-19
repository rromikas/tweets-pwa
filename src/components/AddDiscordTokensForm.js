import React from "react";
import { useFormik } from "formik";
import Button from "components/Button";
import * as Yup from "yup";
import Select from "@material-ui/core/Select";
import ArrowDown from "assets/ArrowDown.png";

const IconComponent = () => {
  return (
    <div className="absolute right-3 w-4 top-0 bottom-0 my-auto h-7">
      <img alt="expand" src={ArrowDown}></img>
    </div>
  );
};

const AddDiscordTokensForm = ({ onAddToken, onClose, profiles }) => {
  const { values, handleSubmit, handleChange, setFieldValue, errors, submitCount } = useFormik({
    onSubmit: (values, { resetForm }) => {
      onAddToken(values);
      onClose();
    },
    initialValues: {
      discord_token: "",
      profile_id: "",
    },
    validationSchema: Yup.object().shape({
      discord_token: Yup.string().required("Required"),
      profile_id: Yup.string().required("Required"),
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
        <div className="text-center text-xl mb-7">Add Discord Tokens</div>
        <div className="flex justify-between">
          <div>Discord Token</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.discord_token ? errors.discord_token : ""}
          </div>
        </div>
        <input
          placeholder="Token"
          spellCheck={false}
          type="text"
          name="discord_token"
          value={values.discord_token}
          onChange={handleChange}
          className="bg-blue-700 mb-5 font-semibold w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>
        <div className="flex justify-between">
          <div>Bind To Profile</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.profile_id ? errors.profile_id : ""}
          </div>
        </div>
        <Select
          value={values.profile_id}
          IconComponent={IconComponent}
          disableUnderline
          className="w-full mb-5"
          native
          classes={{
            root:
              "py-3.5 bg-blue-700 px-3 rounded-2xl text-white font-jost capitalize font-semibold",
          }}
          onChange={(e) => {
            setFieldValue("profile_id", e.target.value);
          }}
        >
          <option value="" className="text-blue-900"></option>
          {profiles.map((x, i) => (
            <option key={`text-ch-${i}`} value={x.id} className="text-blue-900">
              {x.profile_name}
            </option>
          ))}
        </Select>
        <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default AddDiscordTokensForm;
