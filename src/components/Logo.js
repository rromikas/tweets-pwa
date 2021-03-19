import LogoImage from "assets/Logo.png";
import React from "react";
import { useHistory } from "react-router-dom";

const Logo = () => {
  const history = useHistory();
  return (
    <div className="flex items-center cursor-pointer" onClick={() => history.push("/")}>
      <img alt="logo" width={34} src={LogoImage} className="mr-3"></img>
      <div className="font-bold text-white">Tweet Catcher</div>
    </div>
  );
};

export default Logo;
