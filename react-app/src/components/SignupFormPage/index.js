import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  if (user) {
    return <Redirect to={`/discovery`} />;
  }

  return (
    <div className="signup_container">
      <div className="sign_form">
        <h1 className="sign_title">Sign Up</h1>
        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="sign_credential first_cred">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="sign_credential">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="sign_credential">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="sign_credential">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit_sign_btn" type="submit">
            Sign Up
          </button>
        </form>
        <div className="social-links">
               <a href="https://github.com/kkong88">
                <img src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1692831825/1200px-GitHub_Invertocat_Logo.svg_vhlphv.png" className="left_side_icon" />
            </a>
              <a href="https://www.linkedin.com/in/kelly-kong-033333186/">
                 <img src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1692831946/square-linkedin-logo-isolated-white-background_469489-892_gfubjw.png" className="left_side_icon" />
              </a>
                 <a href="https://wellfound.com/u/kelly-kong-1">
               <img src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1692832810/1668538387615_yvrj9w.jpg" className="left_side_icon" />
              </a>
          </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
