import React, { useState } from "react";
import Navbar from "components/Navbar";
import Menu from "components/Menu";
import Home from "components/Home";
import Drawer from "@material-ui/core/Drawer";
import DiscordAuth from "components/DiscordAuth";
import { v4 as uuidv4 } from "uuid";
import Simplebar from "simplebar-react";
import { SizeMe } from "react-sizeme";
import Toolbox from "components/Toolbox";
import Toolbar from "components/Toolbar";
import Tasks from "components/Tasks";
import Discord from "components/Discord";
import Settings from "components/Settings";
import Analytics from "components/Analytics";
import Profile from "components/Profile";
import { useHistory } from "react-router-dom";

const RenderPage = (pageIndex, props) => {
  const { user, onLogin, profiles, setProfiles } = props;
  switch (pageIndex) {
    case 0:
      return <Home></Home>;
    case 1:
      return <Tasks profiles={profiles}></Tasks>;
    case 2:
      return <Profile profiles={profiles} setProfiles={setProfiles}></Profile>;
    case 3:
      return user ? <Discord></Discord> : <DiscordAuth onLogin={onLogin}></DiscordAuth>;
    case 4:
      return <Settings profiles={profiles} setProfiles={setProfiles}></Settings>;
    case 5:
      return <Analytics></Analytics>;
    default:
      return <Home></Home>;
  }
};

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([
    {
      id: uuidv4(),
      profile_name: "Profile 1",
      first_name: "John",
      last_name: "Smith",
      email: "johnsmith@gmail.com",
      card_number: 1234123412341234,
      exp_month: 6,
      exp_year: 2023,
      postal_code: 12321,
      discord_token: null,
    },
    {
      id: uuidv4(),
      profile_name: "Profile 2",
      first_name: "Bryan",
      last_name: "Cranston",
      email: "breakingbad@gmail.com",
      card_number: 1234123412341234,
      exp_month: 6,
      exp_year: 3000,
      postal_code: 12321,
      discord_token: null,
    },
  ]);
  const [fullScreen, setFullScreen] = useState(false);

  const onLogin = () => setUser(true);
  const pageProps = { user, onLogin, profiles, setProfiles };
  const history = useHistory();
  return (
    <div
      className={`fixed transition-all left-0 top-0 right-0 bottom-0 bg-blue-700 flex flex-col z-10 ${
        fullScreen ? "" : "m-5 rounded-xl"
      }`}
    >
      <div className="absolute right-5 top-5">
        <Toolbar
          onClose={() => history.push("/login")}
          onPopout={() => setFullScreen(true)}
          onMinimize={() => setFullScreen(false)}
        ></Toolbar>
      </div>
      <Drawer anchor="left" open={isMenuOpened} onClose={() => setIsMenuOpened(false)}>
        <div className="h-full bg-blue-700 py-4">
          <Menu setPage={setPage} page={page} closeMenu={() => setIsMenuOpened(false)}></Menu>
        </div>
      </Drawer>
      <Navbar toggleMenu={() => setIsMenuOpened(true)}></Navbar>
      <SizeMe monitorHeight>
        {({ size }) => (
          <div className="flex flex-grow h-0">
            <Simplebar className="w-60 hidden md:block h-full mr-2">
              <div style={{ height: size.height }} className="w-full flex flex-col">
                <Menu setPage={setPage} page={page}></Menu>
                <div className="flex-grow flex items-end text-white font-semibold text-sm">
                  <Toolbox></Toolbox>
                </div>
              </div>
            </Simplebar>
            <div className="flex-grow pl-4 md:pl-0 pr-4 pb-4">
              <div className="w-full h-full bg-blue-800 rounded-2xl">
                {RenderPage(page, pageProps)}
              </div>
            </div>
          </div>
        )}
      </SizeMe>
    </div>
  );
};

export default Dashboard;
