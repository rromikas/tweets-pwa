import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import ImageIcon from "assets/Image.png";
import TrashIcon from "assets/Trash.png";
import PasswordIcon from "assets/Password.png";
import Clock from "components/Clock";
import PasswordPopup from "components/Password";
import ImageViewer from "components/ImageViewer";
import ButtonBase from "@material-ui/core/ButtonBase";
import NewWindow from "react-new-window";

const Home = () => {
  const [passwordPopupOpened, setPasswordPopupOpened] = useState(false);
  const [imageViewerOpened, setImageViwerOpened] = useState(false);
  const [posts, setPosts] = useState([
    {
      title: "Succesfully Checked Out! Check your email!",
      values: [
        { title: "Website:", value: "https://dashboard.tweet-catcher.com" },
        { title: "Email:", value: "youemail@gmail.com" },
        { title: "Key:", value: "7NVX-AWE1-BNA1-98BX" },
      ],
      source: "admin",
    },
    {
      title: "Instagram Post Detected (@username)",
      values: [
        { title: "OCR Result from post:", value: "" },
        "",
        { greenValue: "Announcement: We’re stocking soon. Stay tuned!" },
      ],
      source: "instagram",
    },

    {
      title: "Staff Message Received",
      values: [
        {
          title: "Message:",
          value: "Hello Users! @username is restocking soon!",
        },
        { greenValue: "Check the channel guide in the Discord" },
      ],
      source: "admin",
    },
    {
      title: "@lushythedev via  Twitter",
      values: [
        "https://dashboard.tweet-catcher.com/purchase?password=",
        "",
        { title: "password = ", value: "RESTOCK2021!!!" },
      ],
      source: "twitter",
    },
  ]);

  const twitterActions = [
    { title: "Retweet", onClick: () => {} },
    { title: "Like", onClick: () => {} },
    { title: "Link", onClick: () => {} },
  ];

  const generalActions = [
    {
      icon: PasswordIcon,
      title: "Password",
      onClick: () => {
        setPasswordPopupOpened(true);
      },
    },
    {
      icon: ImageIcon,
      title: "Image Viewer",
      onClick: () => {
        setImageViwerOpened(true);
      },
    },
    {
      icon: TrashIcon,
      title: "Clear",
      onClick: () => {
        setPosts([]);
      },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center text-white font-bold">Post Feed</div>
      {passwordPopupOpened ? (
        <NewWindow
          copyStyles
          features={{ width: 650, height: 396 }}
          onUnload={() => setPasswordPopupOpened(false)}
        >
          <PasswordPopup onClose={() => setPasswordPopupOpened(false)}></PasswordPopup>
        </NewWindow>
      ) : null}

      {imageViewerOpened ? (
        <NewWindow
          features={{ width: 512, height: 430 }}
          onUnload={() => setImageViwerOpened(false)}
        >
          <ImageViewer onClose={() => setImageViwerOpened(false)}></ImageViewer>
        </NewWindow>
      ) : null}

      <SimpleBar className="flex-grow h-0 ml-5 mr-1 mb-4 pr-4">
        {posts.map((post, i) => (
          <div key={`post-${i}`} className="bg-blue-700 rounded-xl mb-2 p-4">
            <div className="text-green font-bold mb-3">{post.title}</div>
            <div className="flex justify-between items-center flex-wrap">
              <div className="mr-2 mb-2 font-medium">
                {post.values.map((x, y) => (
                  <div key={`post-${i}-val-${y}`}>
                    {x.title ? (
                      <div className="flex">
                        <div className="mr-2 text-white capitalize">{x.title}</div>
                        <div className="text-green">{x.value}</div>
                      </div>
                    ) : x.greenValue ? (
                      <div className="text-green">{x.greenValue}</div>
                    ) : (
                      <div className="h-5 text-white">{x}</div>
                    )}
                  </div>
                ))}
              </div>
              {post.source === "twitter" ? (
                <div className="flex flex-wrap items-center">
                  {twitterActions.map((x, j) => (
                    <ButtonBase
                      key={`action-${j}}-post-${i}`}
                      className="bg-blue-500 w-24 mb-2 hover:bg-blue-501 outline-none transition rounded-xl text-center py-1 text-white font-semibold mx-1"
                    >
                      {x.title}
                    </ButtonBase>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </SimpleBar>
      <SimpleBar className="pb-4">
        <div style={{ minWidth: 740 }} className="flex items-center px-5 text-white">
          <div className="flex select-none text-sm">
            {generalActions.map((action, i) => (
              <ButtonBase
                onClick={action.onClick}
                key={`bottom-panel-btn-${i}`}
                className="outline-none mr-2 bg-blue-700 font-semibold hover:bg-blue-600 rounded-2xl px-4 py-3 transition cursor-pointer flex items-center"
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
    </div>
  );
};

export default Home;
