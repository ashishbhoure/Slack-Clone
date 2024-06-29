import React from "react";
import { databases } from "../config/config";
import toast from "react-hot-toast";
import { ID } from "appwrite";
import { useDispatch } from "react-redux";
import { enterRoom } from "../redux/appSlice";
import { useNavigate } from "react-router";

export default function SidebarOptions({
  title,
  icon,
  addChannelOption,
  setRender,
  render,
  deleteBtn,
  id,
  username,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
          roomName: title,
        })
      );
      navigate(`/chatsection`);
    }
  };
  /* -----------------------------------------------------------------------------------------------------------------------
                                   // inserting data into rooms table
  -------------------------------------------------------------------------------------------------------------------------- */
  const addChannel = () => {
    try {
      const channelName = prompt("Please enter the channel name");
      if (!channelName) return;

      if (channelName.length > 20) {
        toast.error("channel name should be less than 20 characters");
        return;
      }

      const promise = databases.createDocument(
        "657c921dbb1d727e7892", // database id
        "657c92254fd30c159f33", // collection id
        ID.unique(), // document id
        {
          channelName: channelName,
          admin: username,
        }
      );

      promise.then(
        function (response) {
          toast.success("Channel added successfully");
          // Success
        },
        function (error) {
          toast.error("error while adding channel", error.message);
          console.log(error); // Failure
        }
      );
      setTimeout(() => {
        setRender(!render);
      }, 2000);
    } catch (err) {
      toast.error("error while adding channel", err.message);
    }
  };

  function deleteHandler(e) {
    e.preventDefault();

    const data = databases.getDocument(
      "657c921dbb1d727e7892", // database id
      "657c92254fd30c159f33", // collection id
      id // document id
    );
    data.then(
      function (response) {
        console.log(response);
        if (response.admin !== username) {
          toast.error("you are not admin");
          return;
        }
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }

  /* ------------------------------------------------Rendering------------------------------------------------------------------- */
  return (
    <div
      className="flex text-sm items-center pl-2 cursor-pointer hover:opacity-80 hover:bg-[#340e36]"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      <div className=" ">{icon && icon}</div>
      <div className="p-1 ml-2 font-normal ">{title}</div>

      <div className="mx-auto ">
        {deleteBtn && <button onClick={deleteHandler}> delete</button>}
      </div>
    </div>
  );
}
