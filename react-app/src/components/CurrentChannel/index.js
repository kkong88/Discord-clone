import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { postMessage, addChannelMessage, getOneChannel, deleteChannelMessage, updateChannelMessage, updateMessage, setCurrentChannel, confirmChannelMessageDeletion } from "../../store/channels";
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
      dispatch(addChannelMessage(data["message"]));
    });

    socket.on("message_deleted", (data) => {
      // dispatch(deleteChannelMessage(data.messageId, data.channelId));
      dispatch(confirmChannelMessageDeletion(data.messageId, data.channelId));
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
  const channelId = useSelector((state) => state.channelsReducer?.currentChannel?.id)
  const dispatch = useDispatch();
  const { socket, socketRoom } = useSocket(channelId, dispatch);
  const [message, setMessages] = useState([])


  const sendMessage = async (formData) => {
    const message = await dispatch(postMessage(channelId, formData));
    socket?.emit("message", { message, room : socketRoom });
  };

  const messages = useSelector((state) => state.channelsReducer?.currentChannel?.messages);

  const handleUpdateMessage = async (messageId, formData, messages, setShowEditMessage) => {
    console.log("MESSAGE ID:", messageId)
    await dispatch(updateMessage(channelId, messageId, formData))
    setShowEditMessage(null); // close the editing bar
  };

  const handleDeleteMessage = async (channelId, messageId) => {
    await dispatch(deleteChannelMessage(channelId, messageId));
    console.log(messageId,channelId,"!@!@!@!@!@!@!@!@!@")
    socket?.emit("delete_message", { messageId, channelId, room: socketRoom });
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
