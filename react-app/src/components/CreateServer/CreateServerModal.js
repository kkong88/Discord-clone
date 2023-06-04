import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CreateServer from ".";

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button className="icon_container">
        <img
          className="left_side_icon"
          alt="create server"
          onClick={() => setShowModal(true)}
        ></img>
      </button> */}
        <OpenModalButton
        buttonText='Create a Server'
        modalComponent={<CreateServer />}
        />
    </>
  );
};

export default CreateServerModal;
