import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs"; // For emoji icon
import useSendMessage from "../../context/useSendMessage";
import EmojiPicker from 'emoji-picker-react';

function Type() {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // To toggle emoji picker

  // Handle emoji selection
  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage(""); // Clear message after sending
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3 h-[11vh] text-center bg-gray-800 items-center relative"> {/* Added relative positioning here */}
          {/* Emoji Button (on the left side of the input) */}
          <button
            type="button"
            className="text-3xl mx-4"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle emoji picker
          >
            <BsEmojiSmile />
          </button>

          {/* Input Field */}
          <div className="w-[70%]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type here"
              className="border-[1px] border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900"
            />
          </div>

          {/* Send Button (on the right side) */}
          <button type="submit" className="text-4xl">
            <IoSend />
          </button>
        </div>

        {/* Emoji Picker (conditionally rendered) */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2"> {/* Centered emoji picker */}
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </form>
    </>
  );
}

export default Type;
