import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../statemanage/useConversation";
import sound from "../assets/noti.mp3";

export default function useGetSocketMessage() {
  const { socket } = useSocketContext();
  const { message, setMessage } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage([...message, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, message, setMessage]);
}
