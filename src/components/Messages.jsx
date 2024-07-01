import React from "react";
import { useEffect, useState } from "react";
import { databases } from "../config/config";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function Messages({flag}) {
  const roomId = useSelector((state) => state.app.roomId);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    console.log("component rendered");
    const AllMessages = databases.listDocuments(
      "668276c2000035250fe7", // db id
      "6682775a001c800b0236", // message id
      [
        Query.equal("rooms", [roomId])
      ]
    );
    AllMessages.then(
      function (response) {
        setMessages(response.documents);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    setIsLoading(false);
  }, [roomId, flag]);



  return (
    <div  >
      { isLoading ? (<div>loading...</div>) : messages?.map((message) => {
        return (
          <div className="w-4/5 m-1 bg-blue-100 px-2 rounded-md flex flex-col gap-1 
          hover:shadow-lg hover:bg-blue-200
          ">
            <div className="flex justify-between items-center">
              <p className="text-xs">{message.sender}</p>
              <p className="mr-5 text-xs">{message.$createdAt}</p>
            </div>

            <p className="mx-2">{message.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
