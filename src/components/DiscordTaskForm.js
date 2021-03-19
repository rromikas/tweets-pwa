import React from "react";
import { useFormik } from "formik";
import Button from "components/Button";
import * as Yup from "yup";
import Select from "@material-ui/core/Select";
import ArrowDown from "assets/ArrowDown.png";
import { dashboards } from "enumerators";
import { v4 as uuidv4 } from "uuid";

const IconComponent = () => {
  return (
    <div className="absolute right-3 w-4 top-0 bottom-0 my-auto h-7">
      <img alt="expand" src={ArrowDown}></img>
    </div>
  );
};

const DiscordTaskForm = ({ onAddTask, onClose, currentChannel, initialTask, onEdit }) => {
  const { values, handleSubmit, handleChange, setFieldValue, errors, submitCount } = useFormik({
    onSubmit: (values, { resetForm }) => {
      if (initialTask) {
        onEdit(values);
      } else {
        onAddTask(values);
      }
      resetForm();
      onClose();
    },
    initialValues: {
      id: uuidv4(),
      keywords: "",
      dashboard: "",
      baseUrl: "",
      ...currentChannel,
      ...initialTask,
    },
    validationSchema: Yup.object().shape({
      keywords: Yup.string().required("Required"),
      dashboard: Yup.string().required("Required"),
      baseUrl: Yup.string().required("Required"),
    }),
  });
  return (
    <div
      className="w-full h-full flex bg-blue-900 bg-opacity-50 overflow-auto"
      onMouseDown={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="text-white font-semibold m-auto bg-blue-1000 rounded max-w-2xl w-full px-16 py-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between flex-wrap">
          <div className="md:w-56 w-full">
            <div className="flex justify-between">
              <div className="mb-2">Keywords</div>
              <div className="text-red-500">
                {submitCount > 0 && errors.keywords ? errors.keywords : ""}
              </div>
            </div>
            <input
              placeholder="+cyber,+com"
              spellCheck={false}
              type="text"
              name="keywords"
              value={values.keywords}
              onChange={handleChange}
              className="bg-blue-700 mb-5 font-semibold w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
            ></input>
          </div>
          <div className="md:w-56 w-full">
            <div className="flex justify-between">
              <div className="mb-2">Dashboard</div>
              <div className="text-red-500">
                {submitCount > 0 && errors.dashboard ? errors.dashboard : ""}
              </div>
            </div>
            <Select
              value={values.dashboard}
              IconComponent={IconComponent}
              disableUnderline
              className="w-full mb-5"
              native
              classes={{
                root:
                  "py-3.5 bg-blue-700 px-3 rounded-2xl text-white font-jost capitalize font-semibold",
              }}
              onChange={(e) => {
                setFieldValue("dashboard", e.target.value);
              }}
            >
              <option value="" className="text-blue-900">
                None
              </option>
              {Object.keys(dashboards).map((x, i) => (
                <optgroup label={x} className="text-blue-900" key={`d-optgroup-${i}`}>
                  {dashboards[x].map((d, j) => (
                    <option key={`opt-${j}-d-${i}`} value={d} className="text-blue-900">
                      {d}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-2">Base URL</div>
          <div className="text-red-500">
            {submitCount > 0 && errors.baseUrl ? errors.baseUrl : ""}
          </div>
        </div>
        <input
          placeholder="Base URL"
          spellCheck={false}
          type="text"
          name="baseUrl"
          value={values.baseUrl}
          onChange={handleChange}
          className="bg-blue-700 mb-5 font-semibold w-full rounded-2xl border border-transparent outline-none py-2.5 px-4 mb-3"
        ></input>
        <div className="flex justify-center">
          <Button type="submit">{initialTask ? "Save" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
};

export default DiscordTaskForm;
