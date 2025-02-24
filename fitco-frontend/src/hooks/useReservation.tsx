import React, { useState } from "react";
import api from "../services/api";

interface IReservationResponse {
  error: boolean;
  data: any | null;
  loading: boolean;
  message: string;
}

interface IReservationData {
  user_id: number;
  service_id: number;
}

export const useReservation = () => {
  const [reservationResponse, setreservationResponse] =
    useState<IReservationResponse>({
      data: null,
      error: false,
      loading: false,
      message: "",
    });

  const createReservation = async (reservationData: IReservationData) => {
    setreservationResponse({
      data: null,
      error: false,
      loading: true,
      message: "",
    });
    try {
      const { data } = await api.post("/reservations", reservationData);

      setreservationResponse({
        data,
        error: false,
        loading: false,
        message: "",
      });
    } catch (error) {
      setreservationResponse({
        data: null,
        error: true,
        loading: false,
        message: "Error al crear la reservación, verifique los datos.",
      });
    }
  };

  return {
    reservationResponse,
    createReservation,
  };
};
