import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import Checkbox from "components/Checkbox";
import Modal from "@material-ui/core/Modal";
import TwitterLoginForm from "components/TwitterLoginForm";
import AddDiscordTokensForm from "components/AddDiscordTokensForm";
import AddTwitterDevKeysForm from "components/AddTwitterDevKeysForm";
import StatefullValue from "components/StatefullValue";
import Button from "components/Button";

const Settings = ({ profiles, setProfiles }) => {
  const [generalSettings, setGeneralSettings] = useState({
    link_opener: true,
    autocopy_password: true,
    automerge_password: true,
    force_chrome_browser: true,
    tweet_processing: true,
    paste_haste_scraper: true,
    staff_message: true,
    tweetdeck_spoofer: true,
  });

  const [discordWebhook, setDiscordWebhook] = useState("");
  const [twitterAccount, setTwitterAcount] = useState(null);

  const [openedModalIndex, setOpenedModalIndex] = useState(-1);
  const [twitterDevKeys, setTwitterDevKeys] = useState({
    consumer_api_key: "",
    consumer_secret_api_key: "",
    access_token: "",
    access_token_secret: "",
  });

  const [discordAutoJoiner, setDicsordAutoJoiner] = useState({ loggedIn: false, enabled: false });

  return (
    <>
      <Modal
        classes={{ root: "bg-blue-500 bg-opacity-0" }}
        open={openedModalIndex === 0}
        onClose={() => setOpenedModalIndex(-1)}
        hideBackdrop
      >
        <div className="w-full h-full">
          <TwitterLoginForm
            onClose={() => setOpenedModalIndex(-1)}
            onAddTwitter={(values) => setTwitterAcount(values)}
          ></TwitterLoginForm>
        </div>
      </Modal>
      <Modal
        classes={{ root: "bg-blue-500 bg-opacity-0" }}
        open={openedModalIndex === 1}
        onClose={() => setOpenedModalIndex(-1)}
        hideBackdrop
      >
        <div className="w-full h-full">
          <AddDiscordTokensForm
            profiles={profiles}
            onClose={() => setOpenedModalIndex(-1)}
            onAddToken={(values) =>
              setProfiles((prev) => {
                let arr = [...prev];
                arr.find((x) => x.id === values.profile_id).discord_token = values.discord_token;
                return arr;
              })
            }
          ></AddDiscordTokensForm>
        </div>
      </Modal>
      <Modal
        classes={{ root: "bg-blue-500 bg-opacity-0" }}
        open={openedModalIndex === 2}
        onClose={() => setOpenedModalIndex(-1)}
        hideBackdrop
      >
        <div className="w-full h-full">
          <AddTwitterDevKeysForm
            twitterDevKeys={twitterDevKeys}
            onClose={() => setOpenedModalIndex(-1)}
            onSaveKeys={(values) => setTwitterDevKeys((prev) => ({ ...prev, ...values }))}
          ></AddTwitterDevKeysForm>
        </div>
      </Modal>
      <div className="w-full h-full flex flex-col text-white font-bold">
        <div className="text-center mb-2">Settings</div>
        <SimpleBar className="flex-grow h-0 px-5 mb-5">
          <div className="flex flex-wrap">
            <div className="sm:w-1/3 md:w-full lg:w-1/3 w-full">
              <div className="mb-4">
                <div className="mb-1">General Settings</div>
                <div className="bg-blue-700 rounded px-3 py-2">
                  {Object.keys(generalSettings).map((x, i) => (
                    <div
                      key={`general-setting-${i}`}
                      className="flex justify-between items-center mb-3"
                    >
                      <div className="capitalize">{x.split("_").join(" ")}</div>
                      <Checkbox
                        className="bg-blue-800"
                        checked={generalSettings[x]}
                        onClick={(prevChecked) =>
                          setGeneralSettings((prev) =>
                            Object.assign({}, prev, { [x]: !prevChecked })
                          )
                        }
                      ></Checkbox>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div>Discord Auto Joiner</div>
                <div className="bg-blue-700 rounded px-3 py-6 mb-3">
                  <div className="flex justify-center flex-wrap mb-4">
                    <Button
                      className="mx-2 mb-2"
                      onClick={() =>
                        setDicsordAutoJoiner((prev) => ({
                          ...prev,
                          loggedIn: prev.loggedIn ? false : true,
                        }))
                      }
                    >
                      {discordAutoJoiner.loggedIn ? "Logout" : "Login"}
                    </Button>
                    <Button
                      className="mx-2 mb-2"
                      onClick={() => setDicsordAutoJoiner((prev) => ({ ...prev, enabled: true }))}
                    >
                      Enable
                    </Button>
                  </div>
                  <div
                    className={`${
                      discordAutoJoiner.loggedIn ? "text-green" : "text-red-500"
                    } text-center`}
                  >
                    <StatefullValue
                      value={discordAutoJoiner.loggedIn ? "Logged In" : "Not Logged In"}
                      loadValue={
                        <span className="text-yellow-500">
                          Logging {discordAutoJoiner.loggedIn ? "in..." : "out..."}
                        </span>
                      }
                      time={3000}
                    ></StatefullValue>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:w-2/3 md:w-full lg:w-2/3 w-full sm:pl-4">
              <div className="mb-3">
                <div className="mb-1">Discord Webhook</div>
                <div className="p-3 bg-blue-700 rounded">
                  <input
                    value={discordWebhook}
                    onChange={(e) => setDiscordWebhook(e.target.value)}
                    spellCheck={false}
                    type="text"
                    className="w-full outline-none bg-blue-900 mb-3 py-1.5 px-4 rounded-xl"
                  ></input>
                  <div className="flex justify-center">
                    <Button className="mr-2">Save</Button>
                    <Button className="ml-2">Test</Button>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="mb-1">Twitter Account</div>
                <div className="p-3 bg-blue-700 rounded flex flex-wrap justify-center">
                  <div className="mr-3 my-2">
                    <Button
                      onClick={() =>
                        twitterAccount ? setTwitterAcount(null) : setOpenedModalIndex(0)
                      }
                      className="inline-block mb-2"
                    >
                      {twitterAccount ? "Logout" : "Login"}
                    </Button>
                    {twitterAccount ? (
                      <div className="text-center text-green">Logged In</div>
                    ) : (
                      <div className="text-center text-red-500">Not Logged In</div>
                    )}
                  </div>
                  <div className="flex my-2">
                    <div className="w-36 mr-2">
                      <input
                        spellCheck={false}
                        type="text"
                        className="w-full outline-none bg-blue-900 py-2 px-4 rounded-xl mb-2"
                      ></input>
                      <div className="text-center">Delay (MS)</div>
                    </div>
                    <Button className="w-auto px-5">Set</Button>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="mb-1">Custom Sound</div>
                <div className="p-3 bg-blue-700 rounded flex justify-center">
                  <Button className="mr-2">Set</Button>
                  <Button className="ml-2">Test</Button>
                </div>
              </div>
              <div className="flex flex-wrap items-end">
                <div className="lg:w-1/2 lg:pr-3 w-full mb-3">
                  <div className="mb-1">Account Modes (Twitter) and Discord Tokens</div>
                  <div className="px-3 py-10 bg-blue-700 rounded flex justify-center">
                    <Button className="mr-2" onClick={() => setOpenedModalIndex(2)}>
                      Add Keys
                    </Button>
                    <Button className="ml-2" onClick={() => setOpenedModalIndex(1)}>
                      Discord
                    </Button>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full lg:pl-2 mb-3">
                  <div className="mb-1">Deactivate Tweet Catcher</div>
                  <div className="px-3 py-10 bg-blue-700 rounded flex justify-center">
                    <Button primary={false}>Deactivate</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default Settings;
