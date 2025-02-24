import { Card, CardContent, Typography, Chip, Grid2 } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

interface ReservationCardProps {
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

const ReservationCard: React.FC<ReservationCardProps> = ({
  status,
  Service,
}) => {
  return (
    <Card sx={{ maxWidth: 420, m: 2, borderRadius: 2, boxShadow: 10 }}>
      <CardContent>
        <Typography variant="h6">{Service?.name || "Name"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {status}
        </Typography>
        <Grid2 container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
          <Grid2 size={{ xs: 6, md: 12 }}>
            <Chip
              sx={{ marginRight: 2 }}
              variant="outlined"
              color="primary"
              icon={<DateRangeIcon />}
              label={Service.date}
            />
            <Chip
              sx={{ marginRight: 2 }}
              variant="outlined"
              color="primary"
              icon={<QueryBuilderIcon />}
              label={Service.start_time}
            />

            <Chip
              sx={{ marginRight: 2 }}
              variant="outlined"
              color="primary"
              icon={<AccessTimeIcon />}
              label={Service.duration}
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
