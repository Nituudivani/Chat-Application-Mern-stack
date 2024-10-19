import React, { useState } from "react";
import useConversation from "../statemanage/useConversation";
import axios from "axios";


export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { message, setMessage, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    // if (selectedConversation && selectedConversation._id) {
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );

      setMessage([...res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send Message: ", error);
      setLoading(false);
    }
  };
  // sendMessage();
  return { loading, sendMessage };
}

// }
