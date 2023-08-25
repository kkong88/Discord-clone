import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <NavBar />
      <div className="home_content">
        <div className="main_content">
          <h1 className="title">Welcome To THIS-CORD</h1>
          <p className="description">
            Join the next generation of community platforms with THIS_CORD, and unlock the power of seamless communication. Embrace the vibrant, diverse, and welcoming atmosphere as you connect with people who share your passions, expand your horizons, and make lasting connections. Start your journey today and experience the future of online communities.
          </p>
            <h1 className="creator">Developed by Kelly Kong</h1>
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
    </div>
  );
};

export default HomePage;
