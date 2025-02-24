import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthContext } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import Reservations from "../pages/Reservations";

function AppRoutes() {
  const { loadUserData, user } = useContext(AuthContext)!;

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<PrivateRoute component={Services} />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="/reservations"
              element={<PrivateRoute component={Reservations} />}
            />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
