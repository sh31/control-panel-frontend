import React, { useEffect, useState, useContext, createContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
export const UserProvider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  apiUrl,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(["loading"]);
  const [tools, setTools] = useState({ "Jupyter Lab": { status: "None" } });

  // TO DO: Define API gateway URLS
  const [authProviderUrls, setAuthProviderUrls] = useState();
  const [apiAuth, setApiAuth] = useState();

  // For testing only... use to simulate delay in receiving data
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const initAuth = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      // TO DO: API Call for users allowed pages
      setPages(["tools", "data"]);

      setLoading(false);
    };
    initAuth();
  }, []);

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback({ max_age: 28800 });
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  const updateToolStatus = () => {
    console.log("Updating tool status");
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        user,
        pages,
        tools,
        loading,
        updateToolStatus,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}>
      {children}
    </UserContext.Provider>
  );
};
