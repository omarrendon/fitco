const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
} = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createService); // Solo admin
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.delete("/:id", authMiddleware, deleteService); // Solo admin

module.exports = router;
