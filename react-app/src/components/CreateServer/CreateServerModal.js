import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CreateServer from ".";

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <OpenModalButton
        buttonText='Create a Server'
        modalComponent={<CreateServer />}
        />
    </>
  );
};

export default CreateServerModal;
