import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { postMessage, addChannelMessage, getOneChannel, deleteChannelMessage, updateChannelMessage, updateMessage } from "../../store/channels";
import Messages from "../Messages";
import Chat from "../Chat";

const useSocket = (channelId, dispatch) => {
  const [socket, setSocket] = useState(null);
  const [socketRoom, setSocketRoom] = useState(null);



  useEffect(() => {
    const socket = io();

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("message", (data) => {
      console.log(data,"LINE 20 IN index")
      dispatch(addChannelMessage(data["message"]));
    });

    setSocket(socket);


    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if (channelId && socket) {
      const socketRoom = `channel${channelId}`;
      socket.emit("join_room", {"room" :socketRoom})
      setSocketRoom(socketRoom);
      return (() => {
        socket.emit('leave_room', {'room': socketRoom})
      })
    }
  }, [channelId, socket]);

  return { socket, socketRoom };
};


const CurrentChannel = () => {
  const currentChannel = useSelector((state) => state.channelsReducer?.currentChannel);
  const channelId = currentChannel?.id;
  const messageId = currentChannel?.messages?.id
  const dispatch = useDispatch();
  const { socket, socketRoom } = useSocket(channelId, dispatch);
  const [message, setMessages] = useState([])

  const sendMessage = async (formData) => {
    const message = await dispatch(postMessage(channelId, formData));
    console.log(message,"MESSAGE ON LINE 53!!!!!")
    socket?.emit("message", { message, room : socketRoom });
  };

  const messages = useSelector((state) => state.channelsReducer?.currentChannel?.messages);
  // const handleUpdateMessage = async (messageId, formData) => {
    //   let messageToUpdate = messages.find((message) => message.id === messageId);
    //   let updatedMessage = await dispatch(
      //     updateChannelMessage(channelId, messageId, formData)
      //   );
      //   let newMessages = [...messages];
      //   newMessages[newMessages.indexOf(messageToUpdate)] = updatedMessage;
      //   setMessages(newMessages);
      // };

  // const handleUpdateMessage = async (messageId, formData, messages) => {
  //   // Use the Redux state `messages` instead of local state
  //   // let messageToUpdate = messages.find((message) => message.id === messageId);
  //   await dispatch(updateChannelMessage(channelId, messageId, formData));
  // };
  const handleUpdateMessage = async (messageId, formData, messages, setShowEditMessage) => {
    console.log("MESSAGE ID:", messageId)
    await dispatch(updateMessage(channelId, messageId, formData));
    setShowEditMessage(null); // close the editing bar
  };

  // const handleDeleteMessage = async (channelId, messageId) => {
  //   await dispatch(deleteChannelMessage(channelId, messageId));
  //   let deletedMessage = messages.find((message) => message.id === messageId);
  //   setMessages(messages.filter((message) => message !== deletedMessage));
  // };
  const handleDeleteMessage = async (channelId, messageId) => {
    await dispatch(deleteChannelMessage(channelId, messageId));
  };



  return (
    <div className="current-channel">
      {messages && (
        <div className="messages-container">
          <Messages messages={Object.values(messages)}
          handleDeleteMessage={handleDeleteMessage}
          handleUpdateMessage={handleUpdateMessage}
          />
        </div>
      )}
      <div className="chat-input-container">
        <Chat sendMessage={sendMessage} classname="input" />
      </div>
    </div>
  );

};

export default CurrentChannel;
