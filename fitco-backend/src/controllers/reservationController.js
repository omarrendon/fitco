const Reservation = require("../models/Reservation");
const Service = require("../models/Service");

// Crear reserva
exports.createReservation = async (req, res) => {
  try {
    const { service_id } = req.body;

    const service = await Service.findByPk(service_id);

    if (!service || service.slots <= 0) {
      return res
        .status(400)
        .json({ message: "No hay disponibilidad para este servicio." });
    }

    // Crear reserva
    const reservation = await Reservation.create({
      user_id: req.user.id,
      service_id,
      status: "pending",
    });

    // Reducir cupos
    service.slots -= 1;
    await service.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error al crear reserva", error });
  }
};

// Obtener reservas del usuario
exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { user_id: req.user.id },
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas", error });
  }
};
