import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "./AuthContext";

function RouteProvider({ Component, Protected}) {
  const { isAuthenticated } = useContext(AuthContext);

  if ((isAuthenticated && !Protected) || (!isAuthenticated && Protected)) {
    // user is authenticated, redirect to login page
    return <Navigate to="/" />;
  }

  // user is authenticated, render the route element
  return (
    <section>
        <Component />
    </section>
  )
}

export default RouteProvider;