import React from "react";
import MinimizeIcon from "assets/Minimize.png";
import CloseIcon from "assets/Close.png";
import PopoutIcon from "assets/Popout.png";

const ToolbarIcon = ({ className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`w-3.5 transform hover:scale-105 transitionc cursor-pointer ${className}`}
    ></div>
  );
};

const Toolbar = ({ onClose = () => {}, onPopout = () => {}, onMinimize = () => {} }) => {
  return (
    <div className="flex items-center">
      <ToolbarIcon onClick={onMinimize} className="mr-2">
        <img alt="minimize" src={MinimizeIcon}></img>
      </ToolbarIcon>
      <ToolbarIcon onClick={onPopout} className="mr-2">
        <img alt="popout" src={PopoutIcon}></img>
      </ToolbarIcon>
      <ToolbarIcon onClick={onClose}>
        <img alt="close" src={CloseIcon}></img>
      </ToolbarIcon>
    </div>
  );
};

export default Toolbar;
