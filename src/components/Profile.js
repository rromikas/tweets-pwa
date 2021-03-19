import React, { useState } from "react";
import ProfileForm from "components/ProfileForm";
import Modal from "@material-ui/core/Modal";
import SimpleBar from "simplebar-react";
import EditIcon from "assets/Edit.png";
import Clock from "components/Clock";
import CardImage from "assets/Card.svg";
import CopyIcon from "assets/Copy.png";

const Profile = ({ profiles, setProfiles }) => {
  const [profileFormOpened, setProfileFormOpened] = useState(false);
  const [editingProfileIndex, setEditinigProfileIndex] = useState(-1);

  const actions = [
    {
      icon: EditIcon,
      onClick: (ind) => () => {
        setEditinigProfileIndex(ind);
        setProfileFormOpened(true);
      },
    },
    { icon: CopyIcon, onClick: (ind) => () => {} },
  ];

  const onEditSubmit = (values) => {
    setProfiles((prev) => {
      let arr = [...prev];
      arr[editingProfileIndex] = values;
      return arr;
    });
    setProfileFormOpened(false);
  };
  const onCreateSubmit = (values) => {
    setProfiles((prev) => {
      let finalObj = { ...values };
      delete finalObj["create"];
      return prev.concat([finalObj]);
    });
    setProfileFormOpened(false);
  };

  return (
    <div className="w-full h-full flex flex-col text-white">
      <Modal
        classes={{ root: "bg-blue-500 bg-opacity-0" }}
        open={profileFormOpened}
        onClose={() => setProfileFormOpened(false)}
        hideBackdrop
      >
        <div className="w-full h-full">
          <ProfileForm
            onCreateSubmit={onCreateSubmit}
            onEditSubmit={onEditSubmit}
            initialData={editingProfileIndex > -1 ? profiles[editingProfileIndex] : null}
            onClose={() => setProfileFormOpened(false)}
          ></ProfileForm>
        </div>
      </Modal>
      <div className="text-center mb-2 font-bold">Manage Your Profiles</div>
      <SimpleBar className="flex-grow h-0 ml-5 mr-1 mb-4 pr-4">
        <div className="flex flex-wrap p-7 text-sm">
          {profiles.map((p, i) => (
            <div
              key={`profile-${i}`}
              className="rounded-xl flex-none mb-4 mr-4 bg-cover bg-center w-64 bg-opacity-50 p-3"
              style={{ backgroundImage: `url(${CardImage})` }}
            >
              <div className="font-bold">
                <div className="mb-2">
                  <div className="bg-blue-500 rounded-xl py-0.5 px-3 inline-block">
                    {p.profile_name}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="mr-3">Name: </div>
                  <div className="text-green truncate">{`${p.first_name} ${p.last_name}`}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="mr-3">Email: </div>
                  <div className="text-green truncate">{p.email}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mr-1 break-normal">
                    XXXX-XXXX-XXXX-
                    <span className="text-green">{p.card_number.toString().slice(-4)}</span>
                  </div>
                  <div className="flex items-center">
                    {actions.map((a, j) => (
                      <div
                        key={`profile-${i}-action-${j}`}
                        onClick={a.onClick(i)}
                        className={` mr-${
                          j === 1 ? 0 : 1
                        } rounded w-7 h-7 p-1.5 active:bg-blue-800 bg-blue-800 active hover:bg-blue-900 hover:scale-105 transform cursor-pointer transition-all flex items-center justify-center`}
                      >
                        <img alt="" className="h-auto max-h-4 max-w-4 w-auto" src={a.icon}></img>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
      <SimpleBar className="pb-4">
        <div style={{ minWidth: 740 }} className="flex items-center px-5 text-white">
          <div className="flex select-none font-semibold text-sm">
            <div
              onClick={() => {
                setEditinigProfileIndex(-1);
                setProfileFormOpened(true);
              }}
              className="active:bg-blue-700 mr-2 bg-blue-700 hover:bg-blue-600 rounded-2xl px-4 py-3 transition cursor-pointer flex items-center"
            >
              <img alt="edit" src={EditIcon} className="mr-3 max-w-4 max-h-4 h-auto w-auto"></img>
              <div className="whitespace-nowrap">Create Profile</div>
            </div>
          </div>
          <div className="flex-grow">
            <Clock></Clock>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Profile;
