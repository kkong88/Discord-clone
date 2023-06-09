import CurrentServer from "../CurrentServer";
import { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Chat from "../Chat";

const LandingPage = ({ user }) => {
    return (
          <>
          <h1>LandingPage</h1>
            <Switch>
              <Route
                path="/channels/:serverId/:channelId"
                exact={true}
              >
                <CurrentServer />
              </Route>
            </Switch>
            </>
      );
    };

    export default LandingPage;
