import { Box } from "@mui/material";
import ServiceCard from "./ServiceCard";
import { useFetchServices } from "../hooks/useFetchServices";

const ReservationForm: React.FC = () => {
  const { services, fetchServices } = useFetchServices();

  return (
    <Box>
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} onSuccess={fetchServices} />
      ))}
    </Box>
  );
};

export default ReservationForm;
