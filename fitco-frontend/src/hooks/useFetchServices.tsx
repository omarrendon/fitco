import React, { useEffect, useState } from "react";
import api from "../services/api";

export const useFetchServices = () => {
  const [services, setServices] = useState([]);

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

  return { services, fetchServices };
};
