import React from "react";
import OpenModalButton from "../OpenModalButton";
import CreateChannel from ".";

const CreateChannelModal = () => {
  return (
    <>
        <OpenModalButton
          buttonText={<span style={{color: 'white', fontSize: '14px'}}>Create Channel</span>}
          modalComponent={<CreateChannel />}
        />
    </>
  );
};

export default CreateChannelModal;
