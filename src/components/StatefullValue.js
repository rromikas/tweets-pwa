import { useEffect, useState } from "react";

const StatefullValue = ({ value, loadValue, time }) => {
  const [renderValue, setRenderValue] = useState("");
  useEffect(() => {
    let timeout;
    if (!renderValue) {
      setRenderValue(value);
    } else {
      setRenderValue(loadValue);
      timeout = setTimeout(() => {
        setRenderValue(value);
      }, time);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return renderValue;
};

export default StatefullValue;
