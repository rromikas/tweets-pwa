import React, { useState } from "react";
import StatefullValue from "components/StatefullValue";
import ButtonBase from "@material-ui/core/ButtonBase";

const DiscordAuth = ({ onLogin }) => {
  const [linked, setLinked] = useState(false);

  return (
    <div className="w-full h-full flex flex-col text-white font-bold">
      <div className="text-center mb-2 font-bold">Discord</div>
      <div className="flex-grow mx-6 mb-6 rounded h-0 bg-blue-700 relative flex">
        <ButtonBase
          onClick={() => setLinked(true)}
          className="outline-none rounded-xl font-bold transition cursor-pointer absolute right-4 top-4 bg-blue-500 hover:bg-blue-501 active:bg-blue-502 px-20 py-2.5"
        >
          <StatefullValue
            value={linked ? "Linked!" : "Link Extension"}
            loadValue={"Waiting..."}
            time={3000}
          ></StatefullValue>
        </ButtonBase>
        <div className="m-auto">
          <div className="text-red-500 text-center mb-8">You're not logged in</div>
          <ButtonBase
            onClick={onLogin}
            className="rounded-xl outline-none font-bold rounded transition cursor-pointer bg-blue-500 hover:bg-blue-501 active:bg-blue-502 px-20 py-2.5"
          >
            Login via Discord
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default DiscordAuth;
