const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

router.post("/", createService); // Solo admin
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService); // Solo admin

module.exports = router;
