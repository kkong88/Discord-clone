import Channels from "../Channels";
import "./Messages.css";
import MessageOptions from "../MessageOptions";
import Chat from "../Chat";

import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Messages = ({ messages, handleDeleteMessage, handleUpdateMessage }) => {
  const [hover, setHover] = useState(false);
  const [options, setOptions] = useState(null);
  const [showEditMessage,setShowEditMessage] = useState(false)
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers?.currentServer);
  const channel = useSelector((state) => state.channels?.currentChannel);

  return (
    <div className="messages">
      <h1>Messages</h1>
      {messages?.map((message) => (
        <div
          className="message"
          key={message.id}
          onMouseEnter={() => setHover(message.id)}
          onMouseLeave={() => setHover(null)}
        >
          <div className="message_content">
            <div className="message_user">
              <img
                className="message_pfp"
                src={message.senderProfilePicture}
                alt="pfp"
              />
              <div className="message_user_info">
                <h4 className="username">{message.senderUsername}</h4>
                {showEditMessage !== message.id && <div>{message.content}</div>}
                {showEditMessage === message.id && (
                  <Chat
                    messageToEdit={message}
                    // sendMessage={handleUpdateMessage}
                    sendMessage={(formData) => handleUpdateMessage(message.id, formData, messages, setShowEditMessage)}
                    setShowEditMessage={setShowEditMessage}
                  />
                )}
              </div>
            </div>
            {hover === message.id && message.senderId === 1 && (
              <div className="message_more">
                <button onClick={() => setOptions((prevOptions) => !prevOptions)}>
                  <img
                    src="/svgs/dot-dot.svg"
                    alt="more"
                    className="delete"
                  ></img>
                </button>
              </div>
            )}
            {options && message.id === hover && (
              <MessageOptions
                handleDeleteMessage={handleDeleteMessage}
                message={message}
                user={user}
                server={server}
                channel={channel}
                setShowEditMessage={setShowEditMessage}
                handleUpdateMessage={(messageId, formData) => handleUpdateMessage(messageId, formData, messages, setShowEditMessage)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
