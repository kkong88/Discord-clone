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
//   let messagesEnd = useRef(null);
//   useEffect(() => {
//     let isActive = true;
//     isActive && messagesEnd.current?.scrollIntoView();
//     return () => {
//       isActive = false;
//     };
//   }, [messages]);
return (
  <div className="messages">
    <h1>Messages</h1>
    {messages?.map((message) => (
      <div className="message" key={message.id}>
        <div className="message_content">
          <div className="message_user">
            <img
              className="message_pfp"
              src={message.senderProfilePicture}
              alt="pfp"
            />
            <h4 className="username">{message.senderUsername}</h4>
            {showEditMessage !== message.id && <p>{message.content}</p>}
            {showEditMessage === message.id && (
              <Chat
              messageToEdit={message}
              handleUpdateMessage={handleUpdateMessage}
              setShowEditMessage={setShowEditMessage}
              />
            )}
          </div>
          {hover === message.id && message.senderId !== 1 && (
            <div className="message_more">
              <button
                onClick={() => (options ? setOptions(false) : setOptions(true))}
              >
                {/* <img
                  src="/svgs/dot-dot.svg"
                  alt="more"
                  className="delete"
                ></img> */}
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
            />
          )}
        </div>
      </div>
    ))}
  </div>
 );
};

export default Messages;
