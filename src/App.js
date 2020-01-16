import React, { useEffect } from "react";
import { useUserContext } from "./UserContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Tools from "./components/Tools/Tools";
import Footer from "./components/Footer/Footer";

const App = () => {
  const pathname = window.location.pathname;
  const {
    isAuthenticated,
    loginWithRedirect,
    loading,
    getTokenSilently
  } = useUserContext();

  useEffect(() => {
    const fn = async () => {
      if (loading) {
        return <h1>Loading</h1>;
      }
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: location.pathname }
        });
      }
    };
    fn();
  }, [isAuthenticated, location, loading]);

  if (isAuthenticated) {
    getTokenSilently().then(accessToken => console.log(accessToken));
    return (
      <div>
        <Header />
        <Router>
          <NavBar />
          <div>
            <Switch>
              <Redirect strict from="/home" to="/" />
              <Route exact path="/"></Route>
              <Route path="/tools">
                <Tools />
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <Router>
          <NavBar items={["Unauthorized"]} />
          <div></div>
        </Router>
      </div>
    );
  }
};

export default App;
