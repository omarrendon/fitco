import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import Reservations from "../pages/Reservations";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<PrivateRoute component={Dashboard} />} />
          <Route
            path="/services"
            element={<PrivateRoute component={Services} />}
          />
        </>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
