import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

export default function ChatSection() {
  const roomId = useSelector((state) => state.app.roomId);
  const roomName = useSelector((state) => state.app.roomName);
  const [flag, setFlag] = useState(false);

  return (
    <div className=" overflow-scroll no-scrollbar">
      {roomName && (
        <div className="flex justify-between border-b px-5 py-3">
          <div className="flex items-center">
            <h4 className="lowercase">
              <strong>{roomName}</strong>
            </h4>
            <FaRegStar className="ml-1" />
          </div>
          <div className="flex items-center">
            <IoMdInformationCircleOutline className="mr-1" /> Details
          </div>
        </div>
      )}
      <div>{roomId && <Messages flag={flag} />}</div>

      <div>
        {/* chat input */}
        <ChatInput channelId={roomId} flag={flag} setFlag={setFlag} />
      </div>
    </div>
  );
}
