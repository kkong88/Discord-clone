import CurrentServer from "../CurrentServer";
import { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

const LandingPage = ({ user }) => {
    // const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
    // const [loaded, setLoaded] = useState(true);
    // let url = useLocation();

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
              {/* <ProtectedRoute path="/channels/wampus/404" exact={true}>
                <Wampus />
              </ProtectedRoute>
              <ProtectedRoute path="/channels/*">
                <Wampus />
              </ProtectedRoute> */}
            </Switch>
            </>
      );
    };

    export default LandingPage;
