import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CreateServer from ".";

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);

  const image = <img className="icon" src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1688601881/03-512_w2jexa.png" alt='update a server'  style={{width: '28px', height: '28px'}} />;


  return (
    <>
        <OpenModalButton
        buttonText={image}
        modalComponent={<CreateServer />}
        />
    </>
  );
};

export default CreateServerModal;
