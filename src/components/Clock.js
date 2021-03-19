import React, { useEffect, useState } from "react";

const Clock = () => {
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="bg-blue-700 rounded-2xl px-4 py-3 font-semibold flex items-center text-sm justify-center">
      <div className="mr-3">Date and Time:</div>
      <div>
        {value.getDate() +
          "/" +
          `0${value.getMonth() + 1}`.slice(-2) +
          "/" +
          value.getFullYear() +
          ", " +
          `0${value.getHours()}`.slice(-2) +
          ":" +
          `0${value.getMinutes()}`.slice(-2) +
          ":" +
          `0${value.getSeconds()}`.slice(-2)}
      </div>
    </div>
  );
};

export default Clock;
