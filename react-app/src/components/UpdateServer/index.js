import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  deleteServer,
  putCurrentServer,
} from "../../store/servers";
import { getOneChannel } from "../../store/channels";

const UpdateServer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const server = useSelector((state) => state.serversReducer.currentServer);
  const currentChannel = useSelector(
    (state) => state.channelsReducer?.currentChannel
  );

  const [selected, setSelected] = useState("Overview");
  const [name, setName] = useState(server.name);
  const [errors, setErrors] = useState([]);
  const [activeSave, setActiveSave] = useState(false);
  const [requireSave, setRequireSave] = useState(false);

  useEffect(() => {
    setRequireSave(name !== server.name);
    setErrors(name.length < 20 ? [] : []);
  }, [name, server.name]);

  useEffect(() => {
    setActiveSave(name.length > 0 && errors.length === 0);
  }, [name, errors]);

  const validate = () => {
    let errors = [];
    let valid = 0;

    if (name.trim().length < 1) {
      valid -= 1;
      errors.push("You must include a Server Name.");
      setActiveSave(false);
      setName("");
    } else {
      valid += 1;
    }

    if (name.length > 15) {
      valid -= 1;
      errors.push("Your Server Name must be 15 or fewer characters.");
      setActiveSave(false);
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

  const handleSubmit = async () => {
    if (validate()) {
      setErrors([]);
      const formData = new FormData();
      formData.append("name", name);
      await dispatch(putCurrentServer(server.id, formData)).then(() => closeModal());
      if (currentChannel.id === server.generalChatId) {
        await dispatch(getOneChannel(server.generalChatId));
      }
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteServer(server.id))
      .then(() => history.push(`/discovery`))
      .then(() => closeModal());
  };

  const checkChanges = () => {
    if (name !== server.name) {
      setRequireSave(true);
    }
  };

  const reset = () => {
    setName(server.name);
    setRequireSave(false);
  };

  return (
    <div className="edit_server_modal">
      <div className="container_for_options">
        <div className="edit_options">
          <h5>{name ? name.toUpperCase() : "Server Settings"}</h5>
          <h4 onClick={() => setSelected("Overview")}></h4>
        </div>
      </div>
      <div className="info">
        {selected === "Overview" && (
          <div className="overview_container">
            <h3 className="overview_title" id="9">
            </h3>
            <div className="overview">
              <div className="edit_server_name">
                <label htmlFor="server_name">SERVER NAME</label>
                <input
                  id="server_name"
                  className="server_name"
                  placeholder={server.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {errors.length > 0 && (
              <div className="errors_edit">
                {errors.map((error, ind) => (
                  <div key={ind || error}>{error}</div>
                ))}
              </div>
            )}
            {requireSave && (
              <div className="require_save_container">
                <div className="require_save_message">
                  <h5>DONT FORGET TO SAVE</h5>
                </div>
                <div className="save_reset_btns">
                  <button
                    className="reset"
                    onClick={reset}
                    style={{ cursor: "pointer" }}
                  >
                    Reset
                  </button>
                  <button
                    className={activeSave ? "save active_save" : "save"}
                    onClick={activeSave ? handleSubmit : validate}
                    style={activeSave ? { cursor: "pointer" } : { cursor: "default" }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
         <button
            className="delete"
            onClick={handleDelete}
          > Delete
          </button>
      </div>
      <div className="add_channal_buttons">
      <button className="cancel_button" onClick={() => closeModal()}>Cancel
            </button>
        </div>
    </div>
  );
};

export default UpdateServer;
