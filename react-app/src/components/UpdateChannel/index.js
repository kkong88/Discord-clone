import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putChannel, deleteChannel, getOneChannel } from "../../store/channels";
import { getAServer } from "../../store/servers";
import { useModal } from "../../context/Modal";

const UpdateChannel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const channel = useSelector((state) => state.channelsReducer.currentChannel);
  const server = useSelector((state) => state.serversReducer.currentServer);
  const [selected, setSelected] = useState("Overview");
  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);
  const [requireSave, setRequireSave] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    setRequireSave(name !== channel.name);
  }, [name, channel.name]);

  useEffect(() => {
    setActiveEdit(name.length > 0);
  }, [name, errors]);

  const validate = () => {
    let errors = [];
    let valid = 0;

    if (name.length < 1) {
      valid = -1;
      errors.push("You must include a Channel Name.");
      setActiveEdit(false);
    } else {
      valid = 1;
    }

    let nameArr = name.split(" ");

    for (let i = 0; i < nameArr.length; i++) {
      let ind = nameArr[i];

      if (ind.length > 20) {
        valid = -1;
        setActiveEdit(false);
        errors.push("Channel name has to less than 20 words");
        setErrors(errors);
        return false;
      } else {
        valid = 1;
      }
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
      await dispatch(
        putChannel({ id: channel.id, name, serverId: channel.serverId })
      )
        .then(() => dispatch(getAServer(channel.serverId)))
        .then(() => dispatch(getOneChannel(channel.id)))
        .then(() => setRequireSave(false))
        .then(() => closeModal());
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteChannel(channel.serverId, channel.id))
      .then(() => {
        history.push(`/channels/${channel.serverId}/${server.generalChatId}`);
      })
      .then(() => closeModal());
  };

  const reset = () => {
    setName(channel.name);
    setRequireSave(false);
  };

  return (
    <div className="edit_channel_modal">
      <div className="container_for_options">
        <div className="edit_options">
          {name ? <h5>{name.toUpperCase()}</h5> : <h5>Channel Settings</h5>}
          <h4 onClick={() => setSelected("Overview")}>Overview</h4>
          <div className="delete" onClick={handleDelete}>
            <h3>Delete Channel</h3>
          </div>
        </div>
      </div>
      <div className="info">
        {selected === "Overview" && (
          <div className="overview_container">
            <h3 className="overview_title" id="9">
              Channel Overview
            </h3>
            <div className="overview">
              <div className="edit_channel_name">
                <label htmlFor="channel_name">CHANNEL NAME</label>
                <input
                  id="channel_name"
                  className="channel_name"
                  placeholder={channel.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {errors.length > 0 && (
              <div className="errors_create_chan">
                {errors.map((error, ind) => (
                  <div key={ind || error}>{error}</div>
                ))}
              </div>
            )}
            {requireSave && (
              <div className="require_save_container">
                  <h5
                    className={activeEdit ? "save active_save" : "save"}
                    onClick={activeEdit ? handleSubmit : () => validate()}
                  >
                    Save Changes
                  </h5>
                <div className="save_reset_btns">
                  <h5 className="reset" onClick={reset}>
                    Reset
                  </h5>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div onClick={checkChanges} className="esc_x_container">
        <h5 className="esc">ESC</h5>
      </div> */}
    </div>
  );
};

export default UpdateChannel;
