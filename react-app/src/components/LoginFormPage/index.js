
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";
import { Link } from "react-router-dom";

const LoginFormPage = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password")).then(() => {});
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return (
      <Redirect
        to={`/discovery`}
      />
    );
  }

  return (
    !user && (
    <div class="login_page">
  <div class="login_container">
        <form className="login_form" onSubmit={onLogin}>
          <div className="login_header">
            <h1 className="login_title">Welcome back!</h1>
            <h5 className="login_supp">Please Login</h5>
          </div>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="error">
                {error}
              </div>
            ))}
          </div>
          <div className="login_credential top_cred">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="login_credential bot_cred">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="signup_link_container">
            <p>Need an acoount?</p>
            <Link to="/signup" className="register">
              Register
            </Link>
          </div>
          <div className="buttons_container">
            <button className="submit_button" type="submit">
              Login
            </button>
            <button className="submit_button demo" onClick={handleDemo}>
              Demo Login
            </button>
          </div>
        </form>
      </div>
        </div>
    )
  );
};

export default LoginFormPage;
