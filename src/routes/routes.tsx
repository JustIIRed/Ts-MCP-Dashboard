import { Routes, Route } from "react-router-dom";
import views from "../pages/Home";
import React from "react";
import PageNotFound from "../pages/App/pageNotFound";
import { navOptions } from "../conf/routes.conf";

const AppRoutes = () => {
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
