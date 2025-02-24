import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };
      const { data } = await api.post("/auth/login", userData);
      login(data);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Iniciar Sesión</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Correo"
            type="email"
            margin="normal"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
