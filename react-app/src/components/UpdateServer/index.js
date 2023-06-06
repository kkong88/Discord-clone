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
      errors.push("Server name is needed");
      setActiveSave(false);
      setName("");
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
          <h4 onClick={() => setSelected("Overview")}>Overview</h4>
          <div
            className="delete"
            onClick={handleDelete}
          >
            <h3>Delete Server</h3>
          </div>
        </div>
      </div>
      <div className="info">
        {selected === "Overview" && (
          <div className="overview_container">
            <h3 className="overview_title" id="9">
              Server Overview
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
                  <h4>you have unsaved changes!</h4>
                </div>
                <div className="save_reset_buttons">
                  <h5
                    className="reset"
                    onClick={reset}
                  >
                    Reset
                  </h5>
                  <h5
                    className={activeSave ? "save active_save" : "save"}
                    onClick={activeSave ? handleSubmit : validate}
                  >
                    Save Changes
                  </h5>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        onClick={checkChanges}
        className="esc_x_container"
      >
        <h5 className="esc">ESC</h5>
      </div>
    </div>
  );
};

export default UpdateServer;
