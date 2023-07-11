import { Modal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import UpdateServer from ".";

const UpdateServerModal = ({ serversObj, user, showModal, setShowModal, className }) => {
  const image = <img className="icon"
               src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1689114236/icon_vi4q1k.png"
               alt='update a server'
               style={{width: '28px', height: '28px', background: 'transparent'}} />;


  return (
    <div className={className}>
        <OpenModalButton
        buttonText={image}
        modalComponent={<UpdateServer />}
        />
    </div>
  );
};

export default UpdateServerModal;
