
import "./Channels.css";
import { NavLink } from "react-router-dom";
import { getOneChannel } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateChannelModal from "../CreateChannel/CreateChannelModal";
import UpdateChannelModal from "../UpdateChannel/UpdateChannelModal";

const Channels = () => {
  const { channelId, dmRoomId } = useParams();

  const [ownerId, setOwnerId] = useState();
  const [currentChannelId, setCurrentChannelId] = useState(channelId);
  const [hoverId, setHoverId] = useState(null);
  const [channels, setChannels] = useState(null);
  const user = useSelector((state) => state.session.user);
  const currentServer = useSelector((state) => state.serversReducer?.currentServer);
  const channelsObj = useSelector((state) => state.serversReducer?.currentServer.channels);
  const dispatch = useDispatch();

  useEffect(() => {
    let isActive = true;
    isActive && setCurrentChannelId(channelId);
    if (currentServer && isActive) {
      setOwnerId(currentServer?.owner?.id);
    }
  }, [dispatch, currentServer, setOwnerId, channelsObj, channelId]);

  const handleChannelChange = async (channelId) => {
    await dispatch(getOneChannel(channelId)).then(() =>
      setCurrentChannelId(channelId)
    );
  };

  return (
    <div className="channels">
        {user.id === currentServer?.owner?.id &&
          !channelsObj?.currentChannel?.id && (
          <CreateChannelModal />)
        }
      {channelsObj && Object.values(channelsObj).map((channel) => (
          <NavLink
          key={channel.id}
          to={`/channels/${channel.serverId}/${channel.id}`}
          onClick={() => handleChannelChange(channel.id)}
          >
          <div className="channel">
          <span className="channel_name_channels">{channel.name}</span>
            {((ownerId === user.id && currentChannelId * 1 === channel.id) ||
              (ownerId === user.id && hoverId === channel.id)) &&
              channel.name !== "General Chat" &&
              !channelsObj?.currentChannel?.name && (
                  <div className="channel_right">
                    <UpdateChannelModal />
                </div>
              )}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Channels;
