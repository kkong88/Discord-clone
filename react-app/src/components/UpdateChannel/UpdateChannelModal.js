import { getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import UpdateChannel from ".";
const UpdateChannelModal = ({ channel, user }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  
  return (
    <>
    <OpenModalButton
    buttonText='Update a Channel'
    modalComponent={<UpdateChannel />}
    />
    </>
  );
};

export default UpdateChannelModal;
