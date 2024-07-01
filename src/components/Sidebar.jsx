import React, { useEffect, useState } from "react";
import { FaCircle, FaPencilAlt, FaEnvelopeOpen } from "react-icons/fa";
import {
  MdOutlineInsertComment,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import {
  IoAddOutline,
  IoAppsSharp,
  IoPeopleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { SlPicture } from "react-icons/sl";
import { PiFiles } from "react-icons/pi";
import SidebarOptions from "./SidebarOptions";
import { account, databases } from "../config/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Sidebar(props) {
  const sideMenu = [
    { title: "Thread", icon: <MdOutlineInsertComment /> },
    { title: "Mentions & reactions", icon: <SlPicture /> },
    { title: "Saved Items", icon: <FaEnvelopeOpen /> },
    { title: "Channel browser", icon: <IoBookmarkOutline /> },
    { title: "People & user groups", icon: <IoPeopleSharp /> },
    { title: "Apps", icon: <IoAppsSharp /> },
    { title: "File browser", icon: <PiFiles /> },
    { title: "Show less", icon: <MdExpandLess /> },
  ];

  const { setlogin } = props;
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSessions("current");
      setlogin(false);
      navigate("/");
      toast.success("Logout Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [value, setValue] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await account.get();
        setFullName(response.name);
        setUsername(response.email.split("@")[0]);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(
          "668276c2000035250fe7", // Database ID
          "668276d1002224544881" // Collection ID
        );
        setValue(response.documents);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    fetchUserData();
    fetchDocuments();
  }, [render]);

  return (
    <div className="text-white divide-y divide-neutral-600">
      {/* header info section */}
      <div className="flex items-center basis-1 py-2 border-t border-neutral-600">
        <div>
          <h1 className="text-base font-semibold">{fullName}</h1>
          <p className="flex items-center text-sm">
            <FaCircle className="h-2 mt-1" style={{ color: "green" }} />
            {username}
          </p>
        </div>
        <div className="ml-auto mr-5 text-black bg-white p-1 rounded-full hover:cursor-pointer hover:opacity-80">
          <FaPencilAlt />
        </div>
      </div>

      {/* Menu section */}
      <div className="py-2">
        {sideMenu.map((item, index) => (
          <div
            className="flex text-sm items-center pl-2 cursor-pointer hover:opacity-80 hover:bg-[#340e36]"
            key={index}
          >
            <div>{item.icon}</div>
            <div className="p-1 ml-2 font-normal">{item.title}</div>
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
        {value.map((item) => (
          <SidebarOptions
            title={item.channelName}
            key={item.$id}
            id={item.$id}
            icon={"#"}
            deleteBtn={false}
          />
        ))}
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
