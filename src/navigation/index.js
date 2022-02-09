import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

import Dashboard from "../pages/admin/dashboard";
import AdminLogin from "../pages/admin/adminLogin";
import UserLogin from "../pages/user/userLogin";
import ChangePassword from "../pages/user/changePassword";
import IssuedBook from "../pages/user/issuedBook";
import EditProfile from "../pages/user/profile";
import SearchBook from "../pages/user/searchBook";

import "./navigation.css";
import SuperAdmin from "../pages/admin/superAdmin";
import User from "../pages/admin/user";
import Book from "../pages/admin/book";

export default function Navigation() {
  const login = useSelector((state) => state.login);
  const { userLogin, adminLogin } = login;
  console.log(userLogin, adminLogin);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserLogin} />
        <Route exact path="/admin" component={AdminLogin} />
        <div className="layout">
          {/* <Navbar /> */}
          <div className="body">
            <Sidebar />
            <div className="right-body">
              {/* // User Route */}

              <Route exact path="/user/home" component={IssuedBook} />
              <Route exact path="/user/search-book" component={SearchBook} />
              <Route exact path="/user/profile" component={EditProfile} />
              <Route
                exact
                path="/user/profile/change-password"
                component={ChangePassword}
              />

              {/* // Admin Route */}

              <Route exact path="/admin/home" component={Dashboard} />
              <Route exact path="/admin/super" component={SuperAdmin} />
              <Route exact path="/admin/user" component={User} />
              <Route exact path="/admin/book" component={Book} />
            </div>
          </div>
        </div>

        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
}
