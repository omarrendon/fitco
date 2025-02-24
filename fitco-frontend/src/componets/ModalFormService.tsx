import React, { useEffect, useState } from "react";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import api from "../services/api";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const ModalFormService: React.FC<Props> = ({ onClose, isOpen }) => {
  const [nameService, setNameService] = useState("");
  const [descriptioService, setDescriptioService] = useState("");
  const [durationService, setDurationService] = useState<number | undefined>(
    undefined
  );
  const [slotsService, setSlotsService] = useState<number | undefined>(
    undefined
  );
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    duration?: string;
    slots?: string;
    date?: string;
    time?: string;
  }>({});

  const fetchServices = async () => {
    try {
      await api.get("/services");
    } catch (error) {
      console.error("Error al cargar servicios", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchServices();
    }
  }, []);

  const validateForm = () => {
    let newErrors: {
      name?: string;
      description?: string;
      duration?: string;
      slots?: string;
      date?: string;
      time?: string;
    } = {};

    if (!nameService) newErrors.name = "Debe ingresar un nombre";
    if (!descriptioService)
      newErrors.description = "Debes ingresar una descripción";
    if (!durationService) newErrors.duration = "Debe seleccionar una duración";
    if (!slotsService)
      newErrors.slots = "Debe ingresar un número de espacios disponibles";
    if (!date) newErrors.date = "Debe seleccionar una fecha";
    if (!time) newErrors.time = "Debe seleccionar una hora";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <Dialog
          open={isOpen}
          onClose={onClose}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                if (!validateForm()) return;
                const serviceData = {
                  name: nameService,
                  description: descriptioService,
                  duration: durationService,
                  slots: slotsService,
                  date: date?.format("YYYY-MM-DD"),
                  start_time: time?.format("HH:mm"),
                };
                try {
                  const { data } = await api.post("/services", serviceData);
                  alert("Reserva creada con éxito");
                  setNameService("");
                  setDescriptioService("");
                  setDurationService(undefined);
                  setSlotsService(undefined);
                  setDate(null);
                  setTime(null);
                  setErrors({});
                  fetchServices();
                } catch (error) {
                  console.error("Error al hacer la reserva", error);
                }
                onClose();
              },
            },
          }}
        >
          <DialogTitle variant="h5">Crear servicio</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Nombre Servicio"
              value={nameService}
              onChange={e => setNameService(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Descripción del Servicio"
              value={descriptioService}
              onChange={e => setDescriptioService(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              fullWidth
              label="Lugares disponibles"
              value={slotsService}
              type="number"
              onChange={e => setSlotsService(Number(e.target.value))}
              sx={{ mb: 2 }}
              error={!!errors.slots}
              helperText={errors.slots}
            />
            <TextField
              fullWidth
              label="Duración del Servicio (Minutos)"
              value={durationService}
              type="number"
              onChange={e => setDurationService(Number(e.target.value))}
              sx={{ mb: 2 }}
              error={!!errors.duration}
              helperText={errors.duration}
            />
            <DatePicker
              label="Seleccionar Fecha"
              value={date}
              onChange={newDate => setDate(newDate)}
              minDate={dayjs()}
              sx={{ mb: 2, width: "100%" }}
              slotProps={{
                textField: { error: !!errors.date, helperText: errors.date },
              }}
            />

            <TimePicker
              label="Seleccionar Hora"
              value={time}
              onChange={newTime => setTime(newTime)}
              minTime={dayjs().hour(0).minute(0)}
              sx={{ mb: 2, width: "100%" }}
              slotProps={{
                textField: { error: !!errors.time, helperText: errors.time },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={onClose}
              variant="contained"
              color="error"
              fullWidth
            >
              Cerrar
            </Button>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </LocalizationProvider>
  );
};

export default ModalFormService;
