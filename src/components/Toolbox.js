import React from "react";
import ToolboxImage from "assets/Toolbox.png";
import Button from "components/Button";
import Wifi from "assets/Wifi.png";

const Toolbox = () => {
  return (
    <div className="p-4 rounded-2xl w-full m-4 bg-blue-600">
      <img alt="" src={ToolboxImage} className="mx-auto w-20 mb-4 pt-4"></img>
      <div className="text-center mb-6">Version 1.0</div>
      <div className="flex justify-center mb-6">
        <Button>Check for updates</Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="mr-2">Server:</div>
        <div className="text-green mr-2">Connected</div>
        <div className="w-5">
          <img alt="connected" src={Wifi}></img>
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
