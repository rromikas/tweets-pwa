import React from "react";
import BackgroundImage from "assets/Background.svg";

const Background = () => {
  return (
    <div
      className="fixed z-0 w-full h-full bg-center bg-cover transform scale-105"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    ></div>
  );
};

export default Background;
