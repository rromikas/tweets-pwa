import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "assets/Play.png";
import PauseIcon from "assets/Pause.png";
import EditIcon from "assets/Edit.png";
import TrashIcon from "assets/Trash.png";
import InfoIcon from "assets/Info.png";
import CreateIcon from "assets/Create.png";
import SimpleBar from "simplebar-react";
import Clock from "components/Clock";
import Modal from "@material-ui/core/Modal";
import TaskForm from "components/TaskForm";
import { dashboards } from "enumerators";
import StatefullValue from "components/StatefullValue";
import ButtonBase from "@material-ui/core/ButtonBase";
import { v4 as uuidv4 } from "uuid";
import Collapse from "@material-ui/core/Collapse";
import { Flipper, Flipped, spring } from "react-flip-toolkit";
import { createConfirmation } from "react-confirm";
import Captcha from "components/Captcha";

const confirmPlay = createConfirmation(Captcha);

const Tasks = ({ profiles }) => {
  const [tasks, setTasks] = useState([
    {
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: true,
      delay: "SS",
      status: "stopped",
      profileIds: [profiles[0].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "twitter",
      id: uuidv4(),
    },
    {
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: false,
      delay: "SS",
      status: "running",
      profileIds: [profiles[0].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "instagram",
      id: uuidv4(),
    },
    {
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: false,
      delay: "SS",
      status: "stopped",
      profileIds: [profiles[1].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "twitter",
      id: uuidv4(),
    },
    {
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: true,
      delay: "SS",
      status: "stopped",
      profileIds: [profiles[0].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "instagram",
      id: uuidv4(),
    },
    {
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: false,
      delay: "SS",
      status: "running",
      profileIds: [profiles[1].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "twitter",
      id: uuidv4(),
    },
    {
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: true,
      delay: "SS",
      status: "stopped",
      profileIds: [profiles[0].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "instagram",
      id: uuidv4(),
    },
    {
      id: uuidv4(),
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: false,
      delay: "SS",
      status: "running",
      profileIds: [profiles[1].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "twitter",
    },
    {
      id: uuidv4(),
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: true,
      delay: "SS",
      status: "stopped",
      profileIds: [profiles[0].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "instagram",
    },
    {
      id: uuidv4(),
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: true,
      delay: "SS",
      status: "running",
      profileIds: [profiles[1].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "twitter",
    },
    {
      id: uuidv4(),
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: false,
      delay: "SS",
      status: "stopped",
      profileIds: [profiles[0].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "instagram",
    },
    {
      id: uuidv4(),
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: true,
      delay: "SS",
      status: "stopped",
      profileIds: [profiles[1].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "twitter",
    },
    {
      id: uuidv4(),
      username: "lushythedev",
      privateAccMode: false,
      baseUrl: "",
      retweet: true,
      delay: "SS",
      status: "running",
      profileIds: [profiles[0].id],
      dashboard: dashboards.TL[0],
      socialNetwork: "twitter",
    },
  ]);

  const [taskFormOpened, setTaskFormOpened] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const bodyRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const headerScrollbar = headerRef.current.getScrollElement();
    bodyRef.current.getScrollElement().onscroll = (e) => {
      headerScrollbar.scrollLeft = e.target.scrollLeft;
    };
  }, []);

  const onPlay = (index) => async () => {
    let res = await confirmPlay();
    if (res) {
      setTasks((prev) => {
        let arr = [...prev];
        arr[index].status = "running";
        return arr;
      });
    }
  };

  const onPause = (index) => () => {
    setTasks((prev) => {
      let arr = [...prev];
      arr[index].status = "stopped";
      return arr;
    });
  };

  const onEdit = (index) => () => {
    setTaskToEdit(tasks[index]);
    setTaskFormOpened(true);
  };

  const onDelete = (index) => () => {
    setTasks((prev) => {
      let arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });
  };

  const onInfo = (index) => () => {
    setShowInfoTaskId(tasks[index].id === showInfoTaskId ? "" : tasks[index].id);
  };

  const taskActions = [
    { icon: PlayIcon, onClick: (index) => onPlay(index) },
    { icon: PauseIcon, onClick: (index) => onPause(index) },
    { icon: EditIcon, onClick: (index) => onEdit(index) },
    { icon: TrashIcon, onClick: (index) => onDelete(index) },
    { icon: InfoIcon, onClick: (index) => onInfo(index) },
  ];

  const generalActions = [
    {
      icon: CreateIcon,
      title: "Create Task",
      onClick: () => {
        setTaskToEdit(null);
        setTaskFormOpened(true);
      },
    },
    {
      icon: PlayIcon,
      title: "Start All",
      onClick: () => setTasks((prev) => prev.map((x) => ({ ...x, status: "running" }))),
    },
    {
      icon: PauseIcon,
      title: "Stop All",
      onClick: () => setTasks((prev) => prev.map((x) => ({ ...x, status: "stopped" }))),
    },
    { icon: TrashIcon, title: "Clear Tasks", onClick: (index) => setTasks([]) },
  ];

  const addTask = (values) => {
    setTasks((prev) => prev.concat([values]));
  };

  const editTask = (values) => {
    setTasks((prev) => {
      let arr = [...prev];
      arr[arr.findIndex((x) => x.id === values.id)] = values;
      return arr;
    });
  };

  const [showInfoTaskId, setShowInfoTaskId] = useState("");

  return (
    <Flipper className="w-full h-full flex flex-col text-white font-medium" flipKey={tasks.length}>
      <div className="text-center mb-2 font-bold">Manage Your Tasks</div>
      <Modal
        classes={{ root: "bg-blue-500 bg-opacity-0" }}
        open={taskFormOpened}
        onClose={() => setTaskFormOpened(false)}
        hideBackdrop
      >
        <div className="w-full h-full">
          <TaskForm
            editTask={editTask}
            initialTask={taskToEdit}
            onClose={() => setTaskFormOpened(false)}
            profiles={profiles}
            addTask={addTask}
          ></TaskForm>
        </div>
      </Modal>
      <SimpleBar
        ref={headerRef}
        className="w-full px-5"
        classNames={{ scrollbar: "opacity-0", track: "opacity-0" }}
      >
        <div className="flex" style={{ minWidth: 700 }}>
          <div className="flex-grow flex">
            <div className="w-3/12 text-center">User</div>
            <div className="w-3/12 text-center">Retweet</div>
            <div className="w-3/12 text-center">Delay</div>
            <div className="w-3/12 text-center">Status</div>
          </div>
          <div className="w-48 text-center">Manage</div>
        </div>
      </SimpleBar>
      <SimpleBar ref={bodyRef} className="flex-grow h-0 ml-5 mr-1 mb-4 pr-4">
        {tasks.map((task, i) => (
          <Flipped
            flipId={task.id}
            onExit={(el, ind, removeEl) => {
              spring({
                onUpdate: (val) => {
                  el.style.opacity = 1 - val;
                },
                onComplete: removeEl,
              });
            }}
            key={`task-${task.id}`}
          >
            <div style={{ minWidth: 700 }}>
              <div className="bg-blue-700 mb-2 rounded py-2">
                <div className="flex">
                  <div className="flex flex-grow text-center">
                    <div className="w-3/12">{task.username}</div>
                    <div
                      className={`${
                        task.retweet ? "text-green" : "text-red-500"
                      } capitalize w-3/12`}
                    >
                      {task.retweet.toString()}
                    </div>
                    <div className="w-3/12">{task.delay}</div>
                    <div
                      className={`${
                        task.status === "running" ? "text-green" : "text-red-500"
                      } capitalize w-3/12`}
                    >
                      <StatefullValue
                        value={task.status}
                        time={2000}
                        loadValue={<span className="text-yellow-500">Submitting...</span>}
                      ></StatefullValue>
                    </div>
                  </div>
                  <div className="flex w-48 justify-center select-none">
                    {taskActions.map((action, j) => (
                      <div
                        key={`task-${0}-action-${j}`}
                        onClick={action.onClick(i)}
                        className="rounded w-7 h-7 p-1.5 active:bg-blue-800 bg-blue-800 active hover:bg-blue-900 hover:scale-105 transform cursor-pointer transition-all flex items-center justify-center mr-2"
                      >
                        <img
                          alt=""
                          className="h-auto max-h-4 max-w-4 w-auto"
                          src={action.icon}
                        ></img>
                      </div>
                    ))}
                  </div>
                </div>
                <Collapse in={showInfoTaskId === task.id}>
                  <div className="flex">
                    <div className="flex flex-grow text-center">
                      <div className="w-3/12 text-green">youremail@gmail.com</div>
                      <div className="w-6/12"></div>
                      <div
                        className={`${
                          task.status === "running" ? "text-green" : "text-red-500"
                        } capitalize w-3/12`}
                      >
                        <StatefullValue
                          value={task.status}
                          time={2000}
                          loadValue={<span className="text-yellow-500">Submitting...</span>}
                        ></StatefullValue>
                      </div>
                    </div>
                    <div className="w-48"></div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-grow text-center">
                      <div className="w-3/12 text-green">youremail@gmail.com</div>
                      <div className="w-6/12"></div>
                      <div
                        className={`${
                          task.status === "running" ? "text-green" : "text-red-500"
                        } capitalize w-3/12`}
                      >
                        <StatefullValue
                          value={task.status}
                          time={2000}
                          loadValue={<span className="text-yellow-500">Submitting...</span>}
                        ></StatefullValue>
                      </div>
                    </div>
                    <div className="w-48"></div>
                  </div>
                </Collapse>
              </div>
            </div>
          </Flipped>
        ))}
      </SimpleBar>
      <SimpleBar className="pb-4">
        <div style={{ minWidth: 870 }} className="flex items-center px-5">
          <div className="flex select-none text-sm">
            {generalActions.map((action, i) => (
              <ButtonBase
                onClick={action.onClick}
                key={`bottom-panel-btn-${i}`}
                className="outline-none mr-2 font-semibold bg-blue-700 hover:bg-blue-600 rounded-2xl px-4 py-3 transition cursor-pointer flex items-center"
              >
                <img
                  alt={action.title}
                  src={action.icon}
                  className="mr-3 max-w-4 max-h-4 h-auto w-auto"
                ></img>
                <div className="whitespace-nowrap">{action.title}</div>
              </ButtonBase>
            ))}
          </div>
          <div className="flex-grow">
            <Clock></Clock>
          </div>
        </div>
      </SimpleBar>
    </Flipper>
  );
};

export default Tasks;
