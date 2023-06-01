import "./CurrentChannel.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Messages from "../Messages";


const CurrentChannel = () => {
  const currentChannel = useSelector((state) => state.channelsReducer?.currentChannel);
  const channelId = currentChannel?.id;
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let isActive = true;
    const channelMessagesObj = currentChannel?.messages;

    if (channelMessagesObj && isActive)
      setMessages(Object.values(channelMessagesObj));

    return () => (isActive = false);
  }, [currentChannel]);


  return (
    <>
    {currentChannel?.messages &&
    <Messages
    messages={messages} />}
    </>
  );
};

export default CurrentChannel;
