const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("dotenv").config();

// Routes
const serviceRoutes = require("./routes/serviceRoutes");
const authRoutes = require("./routes/authRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Start server and database conection
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
