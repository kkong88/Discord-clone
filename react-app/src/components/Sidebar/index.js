import "./Sidebar.css";
import Servers from "../Servers";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneChannel } from "../../store/channels";
import CreateServerModal from "../CreateServer/CreateServerModal";

const Sidebar = ({ userServers }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const userServer = useSelector((state) => state.serversReducer.userServers)
  const handleHomeClick = async (channelId) => {
    await dispatch(getOneChannel(channelId)).then(() => dispatch(userServer));
  };

  return (
    user && (
      <div className="left_side" id="left_nav">
        <NavLink
          className="home_button"
          to={'/discovery'}
        >
          <div className="icon_container">
            <img
              src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686255057/discord-icon-all-the-cool-kids-are-moving-discord-podfeet-podcasts-0_puo5ol.png"
              className="left_side_icon"
              alt="home"
            />
          </div>
        </NavLink>
        <CreateServerModal></CreateServerModal>
        <span className="home_seperator" />
        <Servers userServers={userServers} />
        {/* <CreateServerModal /> */}
        <NavLink to="/discovery">
          <div className="icon_container">
            <img
              src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686267131/6473-greencompass_zg6ulj.png"
              className="left_side_icon"
              alt="explore"
            />
          </div>
        </NavLink>
      </div>
    )
  );
};

export default Sidebar;
