import { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid2,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useReservation } from "../hooks/useReservation";
import { AuthContext } from "../context/AuthContext";

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    description: string;
    slots: number;
    date: string;
    start_time: string;
    duration: number;
  };
  onSuccess: () => void;
  showButton?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSuccess,
  showButton = true,
}) => {
  const { reservationResponse, createReservation } = useReservation();
  const { user } = useContext(AuthContext)!;

  const handleReservation = () => {
    const data = {
      user_id: user.user.id,
      service_id: service.id,
    };
    createReservation(data);
    onSuccess();
  };

  return (
    <Card sx={{ maxWidth: 420, m: 2, borderRadius: 2, boxShadow: 10 }}>
      <CardContent>
        <Typography variant="h6">{service?.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {service?.description}
        </Typography>
        <Grid2 container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
          <Grid2 size={{ xs: 6, md: 12 }}>
            <Chip
              sx={{ marginRight: 2 }}
              variant="outlined"
              color="primary"
              icon={<DateRangeIcon />}
              label={service.date}
            />
            <Chip
              variant="outlined"
              color="primary"
              icon={<QueryBuilderIcon />}
              label={service.start_time}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 12 }}>
            <Chip
              sx={{ marginRight: 2 }}
              variant="outlined"
              color="primary"
              icon={<AccessTimeIcon />}
              label={service.duration}
            />

            <Chip
              variant="outlined"
              color="primary"
              icon={<PeopleOutlineIcon />}
              label={service.slots}
            />
          </Grid2>
        </Grid2>
        {showButton && (
          <Button
            disabled={service.slots <= 0}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            fullWidth
            onClick={handleReservation}
          >
            Reservar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
