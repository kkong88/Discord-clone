import Members from "../Members";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CurrentChannel from "../CurrentChannel";
import Channels from "../Channels";
import { getAServer } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";
import UpdateServerModal from "../UpdateServer/UpdateServerModal";

const CurrentServer = () => {
    const [loaded, setLoaded] = useState(false);
    const [validated, setValidated] = useState(true);
    const { serverId, channelId} = useParams();
    const [channelLoaded, setChannelLoaded] = useState(false);

    const dispatch = useDispatch();
    const serversObj = useSelector((state) => state.serversReducer);
    const user = useSelector((state) => state.session.user);
    const membersObj = useSelector((state) => state.serversReducer.currentServer.members)
    const channelsObj = useSelector((state) => state.serversReducer.currentServer.channels)
    let history = useHistory();
    const [member, setMember] = useState(false);

    useEffect(() => {
        let membersArr;
        if (membersObj) membersArr = Object.values(membersObj);
        if (membersArr)
          setMember(membersArr.find((member) => member.userId === user.id));

        setLoaded(true);
        setChannelLoaded(true)
      }, [membersObj, user.id, history, serverId]);

      return (
        loaded && (
          <div className="server_container">
            <div className="channels_container">
              <Channels channels={channelsObj} className="channels" />
            </div>
            <div className="one_channel">
              {channelLoaded && (
                <CurrentChannel channelsObj={channelsObj} className="one_channel" />
                )}
            </div>
            <div className="members_container">
              {channelLoaded && (
                <Members />
                )}
            </div>
                <UpdateServerModal/>
          </div>
        )
      );
    };

    export default CurrentServer;
