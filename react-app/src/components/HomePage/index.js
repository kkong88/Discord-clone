import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <NavBar />
      <div className="home_content">
        <div className="main_content">
          <h1 className="title">Welcome to THIS-CORD</h1>
          <p className="description">
            Join the next generation of community platforms with THIS_CORD, and unlock the power of seamless communication. Embrace the vibrant, diverse, and welcoming atmosphere as you connect with people who share your passions, expand your horizons, and make lasting connections. Start your journey today and experience the future of online communities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
