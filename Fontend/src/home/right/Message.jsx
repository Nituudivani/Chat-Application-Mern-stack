import React from "react";

function Message({ message,ind }) {
  const authUser = JSON.parse(sessionStorage.getItem("messenger"));
  const itsme = message.senderId === authUser.user._id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "bg-blue-600" : "";
  const createdAt = message.createdAt ? new Date(message.createdAt) : new Date();
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });


  return (
    <>
      <div className="p-4">
        <div className= {`chat ${chatName}`}>
          <div className= {`chat-bubble text-white ${chatColor}`}> {message.message}</div>
          <div className="text-xs text-gray-300">{formattedTime}</div>
        </div>
      </div>
    </>
  );
}

export default Message;
