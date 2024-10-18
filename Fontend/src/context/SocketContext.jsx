import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
    return useContext(socketContext);
  };

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000/", {
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(socket);
      socket.on("getOnline", (users) => {
        setOnlineUsers(users);
        console.log("Socket disconnected");
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};