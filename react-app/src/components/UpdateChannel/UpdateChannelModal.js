import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import UpdateChannel from ".";

const UpdateChannelModal = ({ channel, user }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.serversReducer.currentChannel);

  // Check if the user is on the current channel
  const isUserOnChannel = currentChannel && currentChannel.id === channel.id;

  return (
    <>
        <OpenModalButton
          buttonText={<span style={{color: 'white', fontSize: '18px',}}>Update Channel</span>}
          modalComponent={<UpdateChannel channel={channel} user={user} />}
        />
    </>
  );
};

export default UpdateChannelModal;
