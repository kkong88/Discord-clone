import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import { useSelector } from "react-redux";

const LogoutButton = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  return user && <button className="log_button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
