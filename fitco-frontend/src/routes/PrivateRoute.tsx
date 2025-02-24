import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { user } = useContext(AuthContext)!;
  return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
