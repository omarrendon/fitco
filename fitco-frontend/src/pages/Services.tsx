import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import NavBar from "../componets/NavBar";
import api from "../services/api";

interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  slots: number;
  date: string;
  start_time: string;
  duration: number;
  onSuccess: () => void;
}

function Services() {
  const [services, setServices] = useState<ServiceCardProps[]>([]);

  const fetchServices = async () => {
    try {
      const { data } = await api.get("/services");
      setServices(data);
    } catch (error) {
      console.error("Error al cargar servicios", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4" sx={{ my: 2 }}>
          Panel de servicios
        </Typography>

        {/* Mostrar Servicios Filtrados y Ordenados */}
        <Grid container spacing={3}>
          {services?.length >= 0 ? (
            services?.map(service => (
              <Grid item key={service?.id} xs={12} sm={6} md={4}>
                {/* CARD TODO */}
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ mt: 3, mx: "auto" }}>
              No se encontraron servicios
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Services;
