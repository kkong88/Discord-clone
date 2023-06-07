import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { postMessage, addChannelMessage, getOneChannel } from "../../store/channels";
import Messages from "../Messages";
import Chat from "../Chat";
let socket
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
    }
  }, [channelId, socket]);

  return { socket, socketRoom };
};


const CurrentChannel = () => {
  const currentChannel = useSelector((state) => state.channelsReducer?.currentChannel);
  const channelId = currentChannel?.id;
  const dispatch = useDispatch();
  const { socket, socketRoom } = useSocket(channelId, dispatch);

  const sendMessage = async (formData) => {
    const message = await dispatch(postMessage(channelId, formData));
    console.log(message,"MESSAGE ON LINE 53!!!!!")
    socket?.emit("message", { message, room : socketRoom });
  };

  const messages = useSelector((state) => state.channelsReducer?.currentChannel?.messages);

  return (
    <>
      {messages && <Messages messages={Object.values(messages)} />}
      <Chat sendMessage={sendMessage} classname="input" />
    </>
  );
};

export default CurrentChannel;
