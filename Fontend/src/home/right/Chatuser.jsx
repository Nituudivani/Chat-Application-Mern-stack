import React from "react";
import useConversation from "../../statemanage/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function Chatuser() {
  const { selectedConversation } = useConversation();
  console.log(selectedConversation);
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedConversation._id); // Check if the user is online

  return (
    <>
      <div className="pl-5 pt-5 h-[11vh] flex space-x-4 bg-gray-950 hover:bg-gray-700 duration-300">
        <div>
          {/* Show green dot if user is online */}
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-14 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">{selectedConversation.name}</h1>
          {/* Show "Online" or "Offline" status */}
          <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>
    </>
  );
}

export default Chatuser;
