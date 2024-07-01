import React from "react";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { databases } from "../config/config";
import { ID } from "appwrite";
import { account } from "../config/config";
import toast from "react-hot-toast";

function ChatInput({ channelId, flag, setFlag }) {
  const [inputData, setInputData] = useState({
    inputData: "",
  });

  const userData = account.get();
  const [username, setUsername] = useState("");
  userData.then(
    function (response) {
      setUsername(response.email.split("@")[0]);
    },
    function (error) {
      console.log(error); // Failure
    }
  );

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      toast.error("Please select a channel");
      return false;
    }
    if (!inputData.inputData) {
      toast.error("Please enter a message");
      return false;
    }
    const message = databases.createDocument(
      "668276c2000035250fe7", // data base ID
      "6682775a001c800b0236",
      ID.unique(),
      {
        rooms: channelId,
        message: inputData.inputData,
        sender: username,
      }
    );

    message.then(
      function (response) {
        setInputData({ inputData: "" });
        console.log("chat message", response);
        setFlag(!flag);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  const changeHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  return (
    <div className="rounded-md">
      <form onSubmit={sendMessage} className="flex justify-center relative">
        <div className="w-[60%] flex justify-between rounded-sm p-2 fixed bottom-[30px] border border-slate-400 ">
          <input
            type="text"
            placeholder={`Message`}
            name="inputData"
            className="w-11/12 outline-none"
            value={inputData.inputData || ""}
            onChange={changeHandler}
          />
          <button>
            <IoMdSend />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
