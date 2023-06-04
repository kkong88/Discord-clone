import React from "react";
import OpenModalButton from "../OpenModalButton";
import CreateChannel from ".";

const CreateChannelModal = () => {

  return (
    <>
        <OpenModalButton
        buttonText='Create a Channel'
        modalComponent={<CreateChannel />}
        />
    </>
  );
};

export default CreateChannelModal;
