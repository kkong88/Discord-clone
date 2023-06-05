import "./HomePage.css";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <NavBar className="nav" />
      <div className="home_container">
        <img
          className="home_main"
          alt="home-center"
        />

        <img className="home_left" alt="home-left" />
        <img
          className="home_right"
          alt="home-right"
        />
        <div className="main_content">
          <h1 className="title">Welcome to THIS-Cord</h1>
          <p className="description">
            A place to find a community
          </p>

          <Link to="/login" className="launch_btn">
            Open THIS-CORD in your browser
          </Link>
        </div>
      </div>
      <div className="home_footer">
          <Link
            to="/"
            exact={true}
            activeClassName="active"
            className="home_link"
          />
        </div>
      </div>
  );
};

export default Home;
