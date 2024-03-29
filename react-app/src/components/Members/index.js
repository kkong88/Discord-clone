import "./Members.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Members = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channelsReducer?.currentChannel);
  const currentServerMembers = useSelector((state) => state.serversReducer?.currentServer?.members);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (currentChannel) {
      setLoaded(true);
    }
  }, [dispatch, currentChannel]);
  if (loaded && currentServerMembers) {
    return (
      <div className="members_list">
        <h2 className="members_title">Members</h2>
        {Object.values(currentServerMembers).map((member) => (
          <div className="member" key={member.id * 2}>
            <div className="member_content">
              <img className="member_pfp" src={member.profilePicture} alt="pfp" />
              <h4>{member.username}</h4>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <h1>Loading...</h1>;
};

export default Members;
