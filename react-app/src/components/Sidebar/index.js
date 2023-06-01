import "./Sidebar.css";
import Servers from "../Servers";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneChannel } from "../../store/channels";

const Sidebar = ({ userServers, user }) => {
  const dispatch = useDispatch();
  const userServer = useSelector((state) => state.serversReducer.userServers)
  const handleHomeClick = async (channelId) => {
    await dispatch(getOneChannel(channelId)).then(() => dispatch(userServer));
  };

  return (
    user && (
      <div className="left_side" id="left_nav">
        <NavLink
          className="home_btn"
          to={`/channels/${Object.values(userServers)[0]?.generalChannelId}`}
          onClick={() =>
            handleHomeClick(Object.values(userServers)[0]?.generalChannelId)
          }
        >
          <div className="icon_container">
            <img
              className="left_side_icon"
              src="/svgs/gray-disc-home.svg"
              alt="home"
            />
          </div>
        </NavLink>
        <span className="home_seperator" />
        <Servers userServers={userServers} />
        {/* <CreateServerModal /> */}
        <NavLink to="/discovery">
          <div className="icon_container">
            <img
              className="left_side_icon"
              src="/svgs/svgexport-16.svg"
              alt="explore"
            />
          </div>
        </NavLink>
      </div>
    )
  );
};

export default Sidebar;
