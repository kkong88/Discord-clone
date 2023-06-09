import "./Servers.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const Servers = ({ userServers }) => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoaded(true);
  }, [userServers]);

  const handleServerClick = async (serverId, channelId) => {
    await dispatch(getAServer(serverId))
      .then(() => dispatch(getOneChannel(channelId)))

    return <Redirect to={`/channels/${serverId}/${channelId}`} />;
  };

  return (
    loaded && (
      <div className="server_container">
        {userServers?.map((server) => (
          <NavLink
            to={`/channels/${server.id}/${server.generalChannelId}`}
            onClick={() => handleServerClick(server.id, server.generalChannelId)}
            key={server.id}
          >
            <img
            // src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686255870/png-clipart-computer-icons-discord-logo-smiley-emoticon-smiley-miscellaneous-blue_zdbu60.png"
              // src={server.picture}
              alt={server.name}
            />
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Servers;
