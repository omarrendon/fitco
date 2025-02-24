import { useContext } from "react";
import { Link } from "react-router";
import { AppBar, Toolbar, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/services">
          Servicios
        </Button>
        <Button color="inherit" component={Link} to="/reservations">
          Reservas
        </Button>

        {user.user.role === "admin" && (
          <>
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
