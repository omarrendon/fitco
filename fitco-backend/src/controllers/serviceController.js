const Service = require("../models/Service");

// Crear un servicio (solo admins)
exports.createService = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message:
          "Acceso denegado, solo administradores pueden crear servicios.",
      });
    }

    const { name, description, duration, slots, date, start_time } = req.body;
    const service = await Service.create({
      name,
      description,
      duration,
      slots,
      date,
      start_time,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error al crear servicio", error });
  }
};

// Obtener todos los servicios
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener servicios", error });
  }
};

// Obtener un servicio por ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener servicio", error });
  }
};

// Eliminar un servicio (solo admins)
exports.deleteService = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    await service.destroy();
    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar servicio", error });
  }
};
