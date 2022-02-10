import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function AdminProtectedRoute({ component: Component, ...restOfProps }) {
    const login = useSelector((state) => state.login);
  const { userLogin, adminLogin } = login;
  const isAuthenticated = adminLogin;
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
}

export default AdminProtectedRoute;