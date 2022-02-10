import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
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
import IssueABook from "../pages/admin/issueABook";
import ReturnBook from "../pages/admin/returnBook";
import IssueUser from "../pages/admin/issueABook/issueUser";
import AdminChangePassword from "../pages/admin/changePassword";
import AdminProtectedRoute from "./adminProtectedRoute";

export default function Navigation() {
  const login = useSelector((state) => state.login);
  const { userLogin, adminLogin } = login;
  console.log(userLogin, adminLogin);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserLogin} />
        <Route exact path="/admin" component={AdminLogin} />

        {userLogin && (
          <>
            <div className="layout">
              {/* <Navbar /> */}
              <div className="body">
                <Sidebar />
                <div className="right-body">
                  {/* // User Route */}
                  <Route exact path="/user/home" component={IssuedBook} />
                  <Route
                    exact
                    path="/user/search-book"
                    component={SearchBook}
                  />
                  <Route exact path="/user/profile" component={EditProfile} />
                  <Route
                    exact
                    path="/user/profile/change-password"
                    component={ChangePassword}
                  />
                   <Route render={() => <Redirect to={{ pathname: "/user/home" }} />} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* // Admin Route */}

        {adminLogin && (
          <>
            <div className="layout">
              {/* <Navbar /> */}
              <div className="body">
                <Sidebar />
                <div className="right-body">
                  <AdminProtectedRoute
                    exact
                    path="/admin/home"
                    component={Dashboard}
                  />
                  <AdminProtectedRoute
                    exact
                    path="/admin/super"
                    component={SuperAdmin}
                  />
                  <AdminProtectedRoute
                    exact
                    path="/admin/user"
                    component={User}
                  />
                  <AdminProtectedRoute
                    exact
                    path="/admin/book"
                    component={Book}
                  />
                  <AdminProtectedRoute
                    exact
                    path="/admin/issue"
                    component={IssueABook}
                  />
                  <AdminProtectedRoute
                    exact
                    path="/admin/issue/issueuser"
                    component={IssueUser}
                  />
                  <AdminProtectedRoute
                    exact
                    path="/admin/issue/return"
                    component={ReturnBook}
                  />
                  <AdminProtectedRoute
                    exact
                    path="/admin/change-password"
                    component={AdminChangePassword}
                  />
                   <Route render={() => <Redirect to={{ pathname: "/admin/home" }} />} />
                </div>
              </div>
            </div>
          </>
        )}

        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </Router>
  );
}
