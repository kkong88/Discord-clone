import "./Chat.css";
import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";


const Chat = ({ sendMessage }) => {
  const userId = useSelector((state) => state.session.user.id);
  const [chatContent, setChatContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", chatContent);
    formData.append("senderId", userId);
    sendMessage(formData);
    setChatContent("");
  };

  return (
    <form className="chat_input" onSubmit={handleSubmit}>
      <input
        className="chat_form"
        placeholder="Send a message!"
        onChange={(e) => setChatContent(e.target.value)}
        value={chatContent}
      />
    </form>
  );
};

export default Chat;
