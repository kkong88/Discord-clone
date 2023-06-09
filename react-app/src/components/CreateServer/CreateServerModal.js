import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CreateServer from ".";

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <OpenModalButton
        buttonText='Create a Server'
        img scr="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686344690/50996310-positive-symbol-zoom-in-plus-sign-icon-isolated-on-white-background_cpbqme.jpg"
        modalComponent={<CreateServer />}
        />
    </>
  );
};

export default CreateServerModal;
