import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { IoAppsSharp } from "react-icons/io5";
import { PiFiles } from "react-icons/pi";
import { IoPeopleSharp } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { SlPicture } from "react-icons/sl";

import { account, databases } from "../config/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
 

export default function Sidebar(props) {
  const sideMenu = [
    {
      title: "Thread",
      icon: <MdOutlineInsertComment />,
    },
    {
      title: "Mentions & reactions",
      icon: <SlPicture />,
    },
    {
      title: "Saved Items",
      icon: <FaEnvelopeOpen />,
    },
    {
      title: "Channel browser",
      icon: <IoBookmarkOutline />,
    },
    {
      title: "People & user groups",
      icon: <IoPeopleSharp />,
    },
    {
      title: "Apps",
      icon: <IoAppsSharp />,
    },
    {
      title: "File browser",
      icon: <PiFiles />,
    },
    {
      title: "Show less",
      icon: <MdExpandLess />,
    },
  ];

  const setlogin = props.setlogin;
  const navigate = useNavigate();
  function logoutHandler(e) {
    e.preventDefault();
    setlogin(false);
    const promise = account.deleteSessions('current');

    promise.then(
      function (response) {
      navigate('/')
        toast.success("Logout Successfully");
        
      },
      function (error) {
        console.log(error);
      }
    );
  }

  const userData = account.get();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  userData.then(
    function (response) {
      setFullName(response.name);
      setUsername(response.email.split("@")[0]);
    },
    function (error) {
      console.log(error); // Failure
    }
  );

  const [value, setValue] = useState([]);
  const [render, setRender] = useState(0);
  useEffect(() => {
    const promise = databases.listDocuments(
      "657c921dbb1d727e7892",
      "657c92254fd30c159f33"
    );
    promise.then(
      function (response) {
        setValue(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }, [render]);

 
  return (
    <div className="text-white divide-y divide-neutral-600">
      {/* header info section */}
      <div className="flex items-center basis-1 py-2 border-t border-neutral-600">
        <div className="">
          <h1 className="text-base font-semibold ">{fullName}</h1>
          <p className="flex items-center text-sm">
            <FaCircle className="h-2 mt-1" style={{ color: "green" }} />
            {username}
          </p>
        </div>
        <div className="ml-auto mr-5  text-black bg-white p-1 rounded-full hover:cursor-pointer hover:opacity-80">
          <FaPencilAlt />
        </div>
      </div>

      {/* Menu section  */}
      <div className="py-2">
        {sideMenu.map((item, index) => (
          <div
            className="flex text-sm items-center pl-2 cursor-pointer hover:opacity-80 hover:bg-[#340e36]"
            key={index}
          >
            <div className=" ">{item.icon && item.icon}</div>
            {item.icon && (
              <div className="p-1 ml-2 font-normal ">{item.title}</div>
            )}
          </div>
        ))}
      </div>

      <div className="py-2">
        <SidebarOptions title={"Channels"} icon={<MdExpandMore />} />
      </div>

      {/* add channel button 👇 */}
      <div className="py-2">
        <SidebarOptions
          title={"Add Channel"}
          icon={<IoAddOutline />}
          addChannelOption
          setRender={setRender}
          render={render}
          username={username}
        />
    
        {
          value.map((item) => (
            <SidebarOptions
              title={item.channelName}
              key={item.$id}
              id={item.$id}
              icon={"#"}
              deleteBtn={!true}
              
            />
          ))
        }
      </div>
      <div className="flex p-2">
        <button
          className="w-1/2 mx-auto flex justify-center rounded-lg bg-red-700 p-1
                         hover:bg-red-900 hover:cursor-pointer hover:opacity-80
                         transition 
                         active:-transtate-y-1 active:shadow-inner active:bg-red-900
      "
          onClick={logoutHandler}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
