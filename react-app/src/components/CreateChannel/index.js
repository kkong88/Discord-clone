import "./CreateChannel.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { postChannel } from "../../store/channels";

const CreateChannel = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState(true);
  const [voice, setVoice] = useState(false);
  const [errors, setErrors] = useState([]);
  const [activeCreate, setActiveCreate] = useState(false);
  const { closeModal } = useModal()
  const dispatch = useDispatch();
  let history = useHistory();

  const server = useSelector((state) => state.serversReducer.currentServer);

  useEffect(() => {
    if (name.length > 0) {
      setActiveCreate(true);
    } else {
      setActiveCreate(false);
    }
  }, [name, errors]);

  const validate = () => {
    let errors = [];
    let valid = 0;
    if (name.length < 1) {
      valid = -1;
      errors.push("You must include a Channel Name.");
      setActiveCreate(false);
    } else {
      valid = 1;
    }
    let nameArr = name.split("-");

    for (let i = 0; i < nameArr.length; i++) {
      let ind = nameArr[i];
      if (ind.length > 15) {
        valid = -1;
        setActiveCreate(false);
        errors.push(
          "Each word in your channel name must be 15 or less characters."
        );
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
      dispatch(
        postChannel({
          serverId: server.id,
          name,
        })
      )
        .then((channel) =>
          history.push(`/channels/${channel.serverId}/${channel.id}`)
        )
        .then(() => closeModal());
    }

    return;
  };


  return (
    <div>
      <div className="inputs_container">
      </div>
      <div className="chan_name_container">
        <label className="chan_name_label" htmlFor="chan_name">
          CHANNEL NAME
        </label>
        <input
          className="chan_name_input"
          id="chan_name"
          onChange={(e) => setName(e.target.value)}
          placeholder="new-channel"
          value={name}
        />
      </div>
      {errors.length > 0 && (
        <div className="errors_create_chann">
          {errors.map((error, ind) => (
            <div key={ind || error}>{error}</div>
          ))}
        </div>
      )}
      <div className="add_channal_buttons">
    <h5 className="cancel_button" onClick={() => closeModal()}>Cancel</h5>
    <h5 className={activeCreate ? "create_channel_button_active" : "create_channel_button"} onClick={activeCreate ? handleSubmit : () => validate()}>Create Channel</h5>
</div>
      </div>
  );
};

export default CreateChannel;
