import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import ReservationForm from "../componets/ReservationForm";
import NavBar from "../componets/NavBar";
import api from "../services/api";
import ReservationCard from "../componets/ReservationCard";

interface Reservation {
  id: number;
  service_id: number;
  status: string;
  Service: {
    id: number;
    name: string;
    description: string;
    slots: number;
    date: string;
    start_time: string;
    duration: number;
  };
}

function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchReservations = async () => {
    try {
      const { data } = await api.get("/reservations");
      setReservations(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4" sx={{ my: 3 }}>
          Control de reservas
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" mb={2}>
              Servicios disponibles
            </Typography>
            <ReservationForm />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" mb={2}>
              Mis Reservas
            </Typography>
            {reservations?.length >= 0 ? (
              reservations?.map(reservation => (
                <ReservationCard
                  key={reservation.id}
                  Service={reservation.Service}
                  status={reservation.status}
                />
              ))
            ) : (
              <Typography variant="body1">
                No hay reservas registradas
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Reservations;
