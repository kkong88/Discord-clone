
import { Modal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import UpdateServer from ".";

const UpdateServerModal = ({ serversObj, user, showModal, setShowModal }) => {


  return (
    <>
        <OpenModalButton
        buttonText='Update a Server'
        modalComponent={<UpdateServer />}
        />
    </>
  );
};

export default UpdateServerModal;
