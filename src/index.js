import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { UserProvider } from "./UserContext";

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

console.log(process.env.AUTH_DOMAIN)

ReactDOM.render(
  <UserProvider
  domain={process.env.AUTH_DOMAIN}
  client_id={process.env.AUTH_CLIENT_ID}
  apiUrl={process.env.AUTH_API_URL}
  redirect_uri={window.location.origin}
  audience={process.env.AUTH_AUDIENCE}
  onRedirectCallback={onRedirectCallback}>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
