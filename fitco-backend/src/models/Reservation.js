const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Service = require("./Service");

const Reservation = sequelize.define("Reservation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
  },
  service_id: {
    type: DataTypes.INTEGER,
    references: { model: Service, key: "id" },
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: "pending",
  },
});

User.hasMany(Reservation, { foreignKey: "user_id" });
Service.hasMany(Reservation, { foreignKey: "service_id" });

Reservation.belongsTo(User, { foreignKey: "user_id" });
Reservation.belongsTo(Service, { foreignKey: "service_id" });

module.exports = Reservation;
