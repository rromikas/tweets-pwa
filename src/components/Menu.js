import React from "react";
import HomeIcon from "assets/Home.png";
import TasksIcon from "assets/Tasks.png";
import ProfileIcon from "assets/Profile.png";
import DiscordIcon from "assets/Discord.png";
import SettingsIcon from "assets/Settings.png";
import AnalyticsIcon from "assets/Analytics.png";
import ButtonBase from "@material-ui/core/ButtonBase";

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Tasks", icon: TasksIcon },
  { title: "Profile", icon: ProfileIcon },
  { title: "Discord", icon: DiscordIcon },
  { title: "Settings", icon: SettingsIcon },
  { title: "Analytics", icon: AnalyticsIcon },
];

const Menu = ({ page, setPage, closeMenu = () => {} }) => {
  return (
    <div className="text-white font-bold px-4 select-none">
      {items.map((x, i) => (
        <ButtonBase
          onClick={() => {
            setPage(i);
            closeMenu();
          }}
          key={`menu-item-${i}`}
          className={`flex items-center ${
            page !== i ? "hover:bg-blue-600" : "bg-blue-600"
          } rounded-2xl px-4 py-3.5 mb-2 transition cursor-pointer outline-none justify-start w-52 font-bold`}
        >
          <img alt={x.title} width={20} src={x.icon} className="mr-3"></img>
          <div>{x.title}</div>
        </ButtonBase>
      ))}
    </div>
  );
};

export default Menu;
