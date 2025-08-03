import { Routes, Route } from "react-router-dom";
import views from "../pages/Home";
import React from "react";
import PageNotFound from "../pages/App/pageNotFound";

const AppRoutes = () => {
  return (
    <Routes>
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
      <Route
        path="/test"
        element={
          views["testPage"] ? (
            React.createElement(views["dashboardPage"])
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
