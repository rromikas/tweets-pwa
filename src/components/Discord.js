import React, { useEffect, useState, useRef } from "react";
import SimpleBar from "simplebar-react";
import UserPhoto from "assets/Photo.png";
import { SizeMe } from "react-sizeme";
import Select from "@material-ui/core/Select";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import DiscordTaskForm from "components/DiscordTaskForm";
import ButtonBase from "@material-ui/core/ButtonBase";
import Collapse from "@material-ui/core/Collapse";
import ArrowDown from "assets/ArrowDown.png";
import { v4 as uuidv4 } from "uuid";
import { Flipper, Flipped } from "react-flip-toolkit";

const Button = ({ primary = true, className, ...rest }) => {
  return (
    <ButtonBase
      {...rest}
      className={`${className} outline-none h-6 text-center w-16 text-sm inline-flex select-none rounded font-bold ${
        primary ? "bg-blue-500 hover:bg-blue-501" : "bg-red-500 hover:bg-red-501"
      }  transition cursor-pointer`}
    ></ButtonBase>
  );
};

const Discord = () => {
  const users = [
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
    { user_photo: UserPhoto },
  ];

  const [channels, setChannels] = useState([
    {
      category: "text",
      channel: "General",
      messages: [
        {
          user_photo: UserPhoto,
          message: "Hello everyone, do you see messages?",
          date: new Date(),
        },
        { user_photo: UserPhoto, message: "Yes, I see.", date: new Date() },
        { user_photo: UserPhoto, message: "Okay, great.", date: new Date() },
      ],
    },
    {
      category: "text",
      channel: "Football",
      messages: [
        {
          user_photo: UserPhoto,
          message: "Hello, John, whats up?",
          date: new Date(),
        },
        {
          user_photo: UserPhoto,
          message: "All good! Have you seen how psg made barce 4 - 1???",
          date: new Date(),
        },
        { user_photo: UserPhoto, message: "Yeah, lol. Xavi for a couch.", date: new Date() },
        {
          user_photo: UserPhoto,
          message: "Hello, John, whats up?",
          date: new Date(),
        },
        {
          user_photo: UserPhoto,
          message: "All good! Have you seen how psg made barce 4 - 1???",
          date: new Date(),
        },
        { user_photo: UserPhoto, message: "Yeah, lol. Xavi for a couch.", date: new Date() },
        {
          user_photo: UserPhoto,
          message: "Hello, John, whats up?",
          date: new Date(),
        },
        {
          user_photo: UserPhoto,
          message: "All good! Have you seen how psg made barce 4 - 1???",
          date: new Date(),
        },
        { user_photo: UserPhoto, message: "Yeah, lol. Xavi for a couch.", date: new Date() },
      ],
    },
    {
      category: "voice",
      channel: "Voice",
      messages: [
        {
          user_photo: UserPhoto,
          message: "Hello, are monkeys smart?",
          date: new Date(),
        },
        {
          user_photo: UserPhoto,
          message: "I don't know, but I surely know they are smarter than you...",
          date: new Date(),
        },
        {
          user_photo: UserPhoto,
          message: "Hahaha. And than you too... ",
          date: new Date(),
        },
      ],
    },
  ]);

  const [currentChannel, setCurrentChannel] = useState({
    category: "text",
    channel: "General",
  });

  const [channelsCategories, setChannelsCategories] = useState([
    {
      category: "text",
      expanded: true,
    },
    {
      category: "voice",
      expanded: true,
    },
  ]);

  const [discordTaskFormOpened, setDiscordTaskFormOpened] = useState(false);
  const [tasks, setTasks] = useState([
    {
      channel: "General",
      category: "text",
      dashboard: "",
      keywords: "+cyber",
      baseUrl: "",
      id: uuidv4(),
    },
    {
      channel: "General",
      category: "text",
      dashboard: "",
      keywords: "+cyber",
      baseUrl: "",
      id: uuidv4(),
    },
    {
      channel: "General",
      category: "text",
      dashboard: "",
      keywords: "+cyber",
      baseUrl: "",
      id: uuidv4(),
    },
  ]);

  const [initialTaskIndex, setInitialTaskIndex] = useState(-1);

  const chatRef = useRef(null);

  useEffect(() => {
    const scrollChatToBottom = () => {
      setTimeout(() => {
        if (chatRef.current) {
          const chat = chatRef.current.getScrollElement();
          chat.scrollTop = 1000;
        } else {
          scrollChatToBottom();
        }
      }, 100);
    };

    scrollChatToBottom();
  }, [currentChannel]);

  return (
    <>
      <Modal
        open={discordTaskFormOpened}
        onClose={() => setDiscordTaskFormOpened(false)}
        hideBackdrop
      >
        <div className="w-full h-full">
          <DiscordTaskForm
            initialTask={initialTaskIndex > -1 ? tasks[initialTaskIndex] : null}
            currentChannel={currentChannel}
            onClose={() => {
              setDiscordTaskFormOpened(false);
              setInitialTaskIndex(-1);
            }}
            onAddTask={(values) => {
              setTasks((prev) => prev.concat([values]));
            }}
            onEdit={(values) => {
              setTasks((prev) => {
                let arr = [...prev];
                arr[initialTaskIndex] = values;
                return arr;
              });
            }}
          ></DiscordTaskForm>
        </div>
      </Modal>
      <div className="w-full h-full flex flex-col text-white font-bold">
        <div className="text-center mb-2 font-bold">Discord</div>
        <div className="flex-grow h-0 bg-blue-700 mx-6 mb-6 rounded overflow-hidden">
          <div className="flex h-full">
            <SimpleBar className="w-24 flex-shrink-0 lg:mr-4">
              <div className="bg-blue-900 px-2.5 py-4">
                {users.map((u, i) => (
                  <div
                    key={`user-${i}`}
                    className="bg-center bg-cover w-16 h-16 mx-auto mb-2"
                    style={{ backgroundImage: `url(${u.user_photo})` }}
                  ></div>
                ))}
              </div>
            </SimpleBar>
            <div className="w-48 bg-blue-900 flex-shrink-0 py-3 hidden lg:block">
              {channelsCategories.map((x, i) => (
                <div key={`channel-category-${i}`}>
                  <div
                    className="mb-2 text-gray-300 flex items-center select-none cursor-pointer"
                    onClick={() =>
                      setChannelsCategories((prev) => {
                        return prev.map((u, ind) =>
                          ind === i ? { ...u, expanded: !prev[i].expanded } : u
                        );
                      })
                    }
                  >
                    <div className="mr-2">
                      - <span className="capitalize">{x.category}</span> Channels
                    </div>
                    <div
                      className={`w-3 h-3 filter-invert transition transform ${
                        x.expanded ? "-rotate-90" : ""
                      }`}
                    >
                      <img alt="expand" className="-mt-1" src={ArrowDown}></img>
                    </div>
                  </div>{" "}
                  <Collapse in={x.expanded} key={`collapse-${i}`}>
                    <div className="mb-4 pl-2">
                      {channels
                        .filter((c) => c.category === x.category)
                        .map((ch, j) => (
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setCurrentChannel((prev) => ({
                                ...prev,
                                category: ch.category,
                                channel: ch.channel,
                              }));
                            }}
                            key={`text-channel-${j}`}
                          >
                            #{ch.channel}
                          </div>
                        ))}
                    </div>
                  </Collapse>
                </div>
              ))}
            </div>
            <div className="flex-grow flex flex-col pt-2">
              <SizeMe monitorHeight>
                {({ size }) => {
                  return (
                    <SimpleBar className="flex-grow h-0 px-3">
                      <div className="justify-between flex mb-2">
                        <div>
                          <Select
                            className="inline-flex lg:hidden"
                            disableUnderline
                            native
                            id="grouped-native-select"
                            classes={{
                              root:
                                "py-0.5 bg-blue-500 px-3 rounded text-white font-jost capitalize font-semibold",
                            }}
                            onChange={(e) => {
                              setCurrentChannel(JSON.parse(e.target.value));
                            }}
                          >
                            <optgroup label="Text Channels" className="text-black text-sm">
                              {channels
                                .filter((x) => x.category === "text")
                                .map((ch, i) => (
                                  <option
                                    key={`text-ch-${i}`}
                                    value={JSON.stringify({
                                      category: "text",
                                      channel: ch.channel,
                                    })}
                                  >
                                    #{ch.channel}
                                  </option>
                                ))}
                            </optgroup>
                            <optgroup label="Voice Channels" className="text-black text-sm">
                              {channels
                                .filter((x) => x.category === "voice")
                                .map((ch, i) => (
                                  <option
                                    key={`voice-ch-${i}`}
                                    value={JSON.stringify({
                                      category: "voice",
                                      channel: ch.channel,
                                    })}
                                  >
                                    #{ch.channel}
                                  </option>
                                ))}
                            </optgroup>
                          </Select>
                        </div>
                        <div className="flex">
                          <Button
                            className="mr-2"
                            onClick={() => {
                              setChannels((prev) => {
                                let arr = [...prev];
                                arr.find(
                                  (x) =>
                                    x.channel === currentChannel.channel &&
                                    x.category === currentChannel.category
                                ).messages = [];
                                return arr;
                              });
                            }}
                          >
                            Clear
                          </Button>
                          <Button primary={false}>Close</Button>
                        </div>
                      </div>
                      <SimpleBar
                        className="bg-blue-900 rounded"
                        ref={chatRef}
                        style={{ height: size.height - 122 }}
                      >
                        <div
                          style={{ height: size.height - 122 }}
                          className="flex items-end flex-wrap pt-3"
                        >
                          <div className="px-3 w-full">
                            {channels
                              .find(
                                (x) =>
                                  x.category === currentChannel.category &&
                                  x.channel === currentChannel.channel
                              )
                              .messages.map((m, i) => (
                                <div
                                  className="flex items-center justify-between mb-3"
                                  key={`message-${i}`}
                                >
                                  <div className="flex items-center mr-3">
                                    <div
                                      className="bg-center bg-cover w-16 h-16 mr-2 flex-none"
                                      style={{ backgroundImage: `url(${m.user_photo})` }}
                                    ></div>
                                    <div>
                                      <div>{m.message}</div>
                                      <div className="text-xs font-semibold text-gray-400 block xl:hidden whitespace-nowrap">
                                        {moment(m.date).format("DD/MM/YYYY, hh:mm:ss")}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-gray-400 hidden xl:block whitespace-nowrap">
                                    {moment(m.date).format("DD/MM/YYYY, hh:mm:ss")}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </SimpleBar>
                      <SimpleBar className="mt-3 mb-3" style={{ height: 400 }}>
                        <Flipper flipKey={tasks.length}>
                          <div className="bg-blue-900 rounded p-3" style={{ minHeight: 400 }}>
                            <div className="flex justify-between mb-3">
                              <div>#{currentChannel.channel}</div>
                              <Button onClick={() => setDiscordTaskFormOpened(true)}>Create</Button>
                            </div>
                            {tasks
                              .filter(
                                (x) =>
                                  x.category === currentChannel.category &&
                                  x.channel === currentChannel.channel
                              )
                              .map((x, i) => (
                                <Flipped flipId={x.id} key={`task-${i}`}>
                                  <div className="row no-gutters mb-2 flex-wrap">
                                    <div className="col">#{x.channel}</div>
                                    <div className="col text-right xl:text-left">{x.keywords}</div>
                                    <div className="col-12 xl:col-auto flex justify-end">
                                      <Button
                                        className="mr-2"
                                        onClick={() => {
                                          setInitialTaskIndex(i);
                                          setDiscordTaskFormOpened(true);
                                        }}
                                      >
                                        Edit
                                      </Button>
                                      <Button primary={false} className="mr-2">
                                        Stop
                                      </Button>
                                      <Button
                                        primary={false}
                                        onClick={() =>
                                          setTasks((prev) => {
                                            let arr = [...prev];
                                            arr.splice(i, 1);
                                            return arr;
                                          })
                                        }
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                </Flipped>
                              ))}
                          </div>
                        </Flipper>
                      </SimpleBar>
                    </SimpleBar>
                  );
                }}
              </SizeMe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discord;
