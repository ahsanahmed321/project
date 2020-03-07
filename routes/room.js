const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../config/database");

const Room = require("../models/Room");
const Reservation = require("../models/Reservation");

router.get("/", (req, res) => {
  res.json("Room Route Tested");
});

// Get All Rooms
router.get("/getallroom", (req, res) => {
  Room.findAll()
    .then(rooms => res.json(rooms))
    .catch(err => console.log(err));
});

//Get Booked Rooms on Current Date
router.post("/getbookedroom", (req, res) => {
  console.log(req.body);
  Reservation.findAll({
    where: {
      [Op.and]: [
        { staying_from: { [Op.lte]: req.body.date } },
        { staying_to: { [Op.gte]: req.body.date } }
      ]
    }
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
