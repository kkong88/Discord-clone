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

  // return (
  //   loaded && (
  //     <div className="server_container">
  //       {userServers?.map((server) => (
  //         <NavLink
  //           to={`/channels/${server.id}/${server.generalChannelId}`}
  //           onClick={() => handleServerClick(server.id, server.generalChannelId)}
  //           key={server.id}
  //         >
  //           <img
  //           src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1685218930/3670157_ysakn3.png"
  //             // src={server.picture}
  //             className="servers_icon"
  //             alt={server.name}
  //           />
  //         </NavLink>
  //       ))}
  //     </div>
  //   )
  // );
  return (
    loaded && (
      <div className="servers_container">
        {userServers?.map((server) => (
          <div className="server_container" key={server.id}>
            <NavLink
              to={`/channels/${server.id}/${server.generalChannelId}`}
              onClick={() => handleServerClick(server.id, server.generalChannelId)}
            >
              <img
                src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1685218930/3670157_ysakn3.png"
                // src={server.picture}
                className="servers_icon"
                alt={server.name}
              />
            </NavLink>
          </div>
        ))}
      </div>
    )
  );

};

export default Servers;
