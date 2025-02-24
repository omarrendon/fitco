const express = require("express");
const {
  createReservation,
  getUserReservations,
} = require("../controllers/reservationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/", authMiddleware, getUserReservations);

module.exports = router;
