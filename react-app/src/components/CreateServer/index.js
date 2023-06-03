import "./CreateServer.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServer } from "../../store/servers";
import { useModal } from "../../context/Modal";

const CreateServer = () => {
  const [showHomeCreate, setShowHomeCreate] = useState(true);
  const [showCreateAbout, setShowCreateAbout] = useState(false);
  const [showCreateFinal, setShowCreateFinal] = useState(false);
  const [name, setName] = useState("");
  const [activeCreate, setActiveCreate] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal()

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleFirstClick = () => {
    setShowHomeCreate(false);
    setShowCreateAbout(true);
  };

  const handleTransition = (transition) => {
    if (transition === 1) {
      setShowCreateAbout(false);
      setShowCreateFinal(true);
    } else if (transition === -1) {
      setShowCreateAbout(false);
      setShowHomeCreate(true);
    } else if (transition === -2) {
      setShowCreateFinal(false);
      setShowCreateAbout(true);
    }
  };

  useEffect(() => {
    if (name.trim().length > 0) {
      setActiveCreate(true);
    } else {
      setActiveCreate(false);
    }
  }, [name, errors]);

  const validate = () => {
    let errors = [];
    let valid = 0;

    if (name.trim().length < 1) {
      valid -= 1;
      errors.push("You must include a Server Name.");
      setActiveCreate(false);
      setName("");
    } else {
      valid += 1;
    }

    if (name.length > 15) {
      valid -= 1;
      errors.push("Your Server Name must be 15 or fewer characters.");
      setActiveCreate(false);
    } else {
      valid += 1;
    }

    if (valid > 0) {
      return true;
    } else {
      setErrors(errors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const formData = new FormData();
      let ownerId = user.id;

      formData.append('ownerId', ownerId);
      formData.append('name', name);

      await dispatch(postUserServer(formData))
      .then(() => closeModal())
    }
  };

  return (
    <div className="create_server_modal">
      {showHomeCreate && (
        <div className="create_server_home">
          <h1>Create Server</h1>
          <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
          <button className="create_my_own" onClick={handleFirstClick}>
            <div className="create_left">
              {/* <img src="/svgs/create.svg" alt="create" /> */}
              <p>Create My Own</p>
            </div>
            {/* <img className="right_carrot" src="/svgs/right-carrot.svg" alt="create" /> */}
          </button>
        </div>
      )}

      {showCreateAbout && (
        <div className="create_server_about">
          <h1>Tell us more about your server</h1>
          <p>In order to help with your setup, is your new server for just a few friends or a larger community?</p>
          <div>
            <button className="create_my_own" onClick={() => handleTransition(1)}>
              <div className="create_left">
                {/* <img src="/svgs/community.svg" alt="create" /> */}
                <p>For a club or community</p>
              </div>
              {/* <img className="right_carrot" src="/svgs/right-carrot.svg" alt="create" /> */}
            </button>
            <button className="create_my_own" onClick={() => handleTransition(1)}>
              <div className="create_left">
                {/* <img src="/svgs/club.svg" alt="create" /> */}
                <p>For me and my friends</p>
              </div>
              {/* <img className="right_carrot" src="/svgs/right-carrot.svg" alt="create" /> */}
            </button>
          </div>
          <div className="back" onClick={() => handleTransition(-1)}>
            <button className="back_text">Back</button>
          </div>
        </div>
      )}

      {showCreateFinal && (
        <div className="create_server_final">
          <h1>Customize your server</h1>
          <p>Give your new server a personality with a name. You can always change it later.</p>
          {errors.length > 0 &&
            errors.map((error) => (
              <p className="error" id={error} key={error}>
                {error}
              </p>
            ))}
          <div className="create_input_container">
            <label className="create_label" htmlFor="server_name">
              SERVER NAME
            </label>
            <input
              id="server_name"
              className="create_input"
              placeholder={`${user.username}'s server`}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="create_btns_container">
            <button onClick={() => handleTransition(-2)} className="back_text">
              Back
            </button>
            <button
              className={activeCreate ? "create_btn active_btn" : "create_btn"}
              onClick={activeCreate ? handleSubmit : () => validate()}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateServer;
