import React, { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation";
import axios from "axios";

export default function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { message, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );

          setMessage(res.data);
          setLoading(false);
        } catch (error) {   
          console.log("Error in useGetMessage: ", error);
          setLoading(false);
        }
      }
    };
    getMessage();
  }, [selectedConversation, setMessage]);
  return {
    message, 
    loading 
  };
};
