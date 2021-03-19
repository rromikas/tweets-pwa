import React from "react";
import CheckIcon from "assets/Check.png";

const Checkbox = ({ checked, onClick, className }) => {
  return (
    <div
      onClick={() => onClick(checked)}
      className={`cursor-pointer select-none w-7 h-7 bg-blue-700 rounded flex items-center justify-center flex-shrink-0 ${className}`}
    >
      {checked ? (
        <img alt="check" className="max-w-3 max-h-3 w-auto h-auto" src={CheckIcon}></img>
      ) : null}
    </div>
  );
};

export default Checkbox;
