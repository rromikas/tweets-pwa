import React from "react";
import Logo from "components/Logo";
import MenuIcon from "assets/Menu.png";

const Navbar = ({ toggleMenu }) => {
  return (
    <div className="h-14 flex justify-between pl-7 pr-24 items-center">
      <Logo></Logo>
      <img
        alt="menu"
        onClick={toggleMenu}
        className="block md:hidden cursor-pointer"
        src={MenuIcon}
      ></img>
    </div>
  );
};

export default Navbar;
