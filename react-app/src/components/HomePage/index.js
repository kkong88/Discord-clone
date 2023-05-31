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
          <h1 className="title">IMAGINE A PLACE...</h1>
          <p className="description">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>

          <Link to="/login" className="launch_btn">
            Open THIS-CORD in your browser
          </Link>
        </div>
      </div>
      <div className="home_footer">
        <div className="produced">
        </div>
        <div className="actual_footer">
          <Link
            to="/"
            exact={true}
            activeClassName="active"
            className="home_link"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
