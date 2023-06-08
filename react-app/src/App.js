import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import DiscoveryServer from "./components/DiscoveryServer";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CurrentServer from "./components/CurrentServer";
import HomePage from "./components/HomePage"
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)
  const servers = useSelector((state) => state.serversReducer);
  const userServers = Object.values(servers?.userServers)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/discovery">
            <Sidebar userServers={userServers}/>
            <DiscoveryServer user={user}/>
          </Route>
          <Route path="/channels">
          <Sidebar userServers={userServers}/>
            <LandingPage user={user}/>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}
//}

export default App;
