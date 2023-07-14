import "./Sidebar.css";
import Servers from "../Servers";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneChannel } from "../../store/channels";
import { logout } from "../../store/session"; // import logout action
import CreateServerModal from "../CreateServer/CreateServerModal";
import UpdateServerModal from "../UpdateServer/UpdateServerModal";
import { useParams } from 'react-router-dom';

const Sidebar = ({ userServers }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const history = useHistory()
  const userServer = useSelector((state) => state.serversReducer.userServers)
  const CurrentServer = useSelector((state) =>  state.serversReducer.currentServer)
  const serverid = CurrentServer.id
  const serverOwnerId = CurrentServer.owner
  const isOwner = user.id === serverOwnerId?.id


  const handleHomeClick = async (channelId) => {
    await dispatch(getOneChannel(channelId)).then(() => dispatch(userServer));
  };

  const handleLogout = async () => { // logout function
    await dispatch(logout());
    history.push('/')
  };


  return (
    user && (
      <div className="left_side" id="left_nav">
        <div className="top_elements">
          <NavLink
            className="home_button"
            to={'/'}
            title={userServers.name}
          >
            <div className="icon_container">
              <img
                src={user.profilePicture}
                className="left_side_icon"
                alt="home"
              />
            </div>
          </NavLink>
            <p className="username">{user.username}</p>
          <CreateServerModal></CreateServerModal>
          <span className="home_seperator" />
          <Servers userServers={userServers}
          />
          <NavLink to="/discovery">
            <div className="icon_container">
              <img
                src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686267131/6473-greencompass_zg6ulj.png"
                className="left_side_icon"
                alt="explore"
              />
            </div>
          </NavLink>
          {serverid && isOwner && <UpdateServerModal className='updateServerModal' />}
        </div>
         <div className="user_container">
          <button onClick={handleLogout} className="logout_button">Logout</button>
        </div>
      </div>
    )
  );
};

export default Sidebar;
