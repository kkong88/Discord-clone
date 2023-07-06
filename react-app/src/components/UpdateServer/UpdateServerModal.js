
import { Modal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import UpdateServer from ".";

const UpdateServerModal = ({ serversObj, user, showModal, setShowModal }) => {

  const image = <img className="icon" src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1688601613/1024px-OOjs_UI_icon_edit-ltr-progressive.svg_cs3wbv.png" alt='update a server'  style={{width: '28px', height: '28px'}} />;


  return (
    <>
        <OpenModalButton
        buttonText={image}
        modalComponent={<UpdateServer />}
        />
    </>
  );
};

export default UpdateServerModal;
