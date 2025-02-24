const sequelize = require("./database");
const Service = require("../models/Service");

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
};

syncDB();
