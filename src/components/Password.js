import React, { useState } from "react";
import CheckIcon from "assets/Check.png";
import ButtonBase from "@material-ui/core/ButtonBase";

const Button = ({ className = "", ...rest }) => {
  return (
    <ButtonBase
      {...rest}
      className={`block w-36 leading-9 font-bold h-9 text-sm text-center rounded-2xl bg-blue-500 hover:bg-blue-501 outline-none cursor-pointer transition select-none whitespace-nowrap ${className}`}
    ></ButtonBase>
  );
};

const Checkbox = ({ checked, onClick, className }) => {
  return (
    <div
      onClick={() => onClick(checked)}
      className={`cursor-pointer select-none w-7 h-7 bg-blue-700 rounded flex items-center justify-center flex-shrink-0 ${className}`}
    >
      {checked ? (
        <img alt="select" className="max-w-3 max-h-3 w-auto h-auto" src={CheckIcon}></img>
      ) : null}
    </div>
  );
};

const Password = ({ onClose }) => {
  const [data, setData] = useState({
    password: "",
    removeCharacter: "",
    replace: "",
    with: "",
    clipboardReader: true,
    alwaysOnTop: true,
  });

  return (
    <div
      className="fixed left-0 top-0 w-full h-full text-white font-bold w-full bg-blue-900 p-2 overflow-auto"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="p-8">
        <div className="mb-3">Enter Password</div>
        <input
          spellCheck={false}
          value={data.password}
          onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
          className="bg-blue-700 mb-4 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
          name="password"
        ></input>
        <div className="flex flex-wrap">
          <div className="flex-grow pr-4 mb-4">
            <div className="mb-3">Remove Character</div>
            <input
              value={data.removeCharacter}
              onChange={(e) => setData((prev) => ({ ...prev, removeCharacter: e.target.value }))}
              spellCheck={false}
              type="text"
              className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
              name="remove_character"
            ></input>
          </div>
          <div className="w-24 pr-4 mb-4">
            <div className="mb-3">Replace</div>
            <input
              value={data.replace}
              onChange={(e) => setData((prev) => ({ ...prev, replace: e.target.value }))}
              spellCheck={false}
              type="text"
              className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
              name="replace"
            ></input>
          </div>
          <div className="w-24 pr-4 mb-4">
            <div className="mb-3">With</div>
            <input
              value={data.with}
              onChange={(e) => setData((prev) => ({ ...prev, with: e.target.value }))}
              spellCheck={false}
              type="text"
              className="bg-blue-700 w-full rounded-2xl border border-transparent outline-none py-2.5 px-4"
              name="with"
            ></input>
          </div>
          <div className="mb-4 flex items-end">
            <div className="py-1">
              <Button className="mb-2">Reverse Password</Button>
              <Button>Remove Specials</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 mb-6">
          <Button className="text-base">Submit</Button>
        </div>
        <div className="h-2 rounded-2xl bg-green mx-7 mb-6"></div>
        <div className="flex justify-center flex-wrap">
          <div className="flex items-center mx-2 mb-2">
            <Checkbox
              checked={data.clipboardReader}
              onClick={(prevVal) => setData((prev) => ({ ...prev, clipboardReader: !prevVal }))}
              className="mr-2"
            ></Checkbox>
            <div>Clipboard Reader</div>
          </div>
          <div className="flex items-center mx-2 mb-2">
            <Checkbox
              className="mr-2"
              checked={data.alwaysOnTop}
              onClick={(prevVal) => setData((prev) => ({ ...prev, alwaysOnTop: !prevVal }))}
            ></Checkbox>
            <div>Always On Top</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
