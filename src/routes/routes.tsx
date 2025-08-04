import { Routes, Route, useLocation } from "react-router-dom";
import views from "../pages/Home";
import React from "react";
import PageNotFound from "../pages/App/pageNotFound";
import { navOptions } from "../conf/routes.conf";
import { useAuthStore } from "../store/Zust/useAuthStore";

const AppRoutes = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const location = useLocation();

  // Allow access to /login even if not authenticated
  if (!authUser && location.pathname !== "/login") {
    // Instead of <Navigate />, render the login page directly
    return views["loginPage"]
      ? React.createElement(views["loginPage"])
      : <PageNotFound />;
  }

  return (
    <Routes>
      {/* Dynamically add routes from navOptions */}
      {navOptions.map((option) => (
        <Route
          key={option.route}
          path={option.route}
          element={
            views[option.label.toLowerCase() + "Page"] ? (
              React.createElement(views[option.label.toLowerCase() + "Page"])
            ) : (
              <PageNotFound />
            )
          }
        />
      ))}
      <Route
        path="/login"
        element={
          views["loginPage"] ? (
            React.createElement(views["loginPage"])
          ) : (
            <PageNotFound />
          )
        }
      />
      {/* Default root to terminal */}
      <Route
        path="/"
        element={
          views["terminalPage"] ? (
            React.createElement(views["terminalPage"])
          ) : (
            <PageNotFound />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
