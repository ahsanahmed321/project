const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { Op } = require("sequelize");

const Reservation = require("../models/Reservation");
const Room = require("../models/Room");

//get all reservations
router.get("/", (req, res) => {
  Reservation.findAll()
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

// Check Reservation
router.post("/checkreservation", (req, res) => {
  console.log("ahsan");
  console.log(req.body);
  check = {};
  check.staying_from = req.body.staying_from;
  check.staying_to = req.body.staying_to;
  check.room_type = req.body.room_type;
  var rooms = [];
  Reservation.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { staying_from: { [Op.gt]: req.body.staying_from } },
            { staying_from: { [Op.lt]: req.body.staying_to } }
          ]
        },
        {
          [Op.and]: [
            { staying_from: { [Op.lte]: req.body.staying_from } },
            { staying_to: { [Op.gte]: req.body.staying_to } }
          ]
        },
        {
          [Op.and]: [
            { staying_to: { [Op.gt]: req.body.staying_from } },
            { staying_to: { [Op.lt]: req.body.staying_to } }
          ]
        }
      ]
    },
    raw: true
  })
    .then(check => {
      if (check.length !== 0) {
        console.log(check);
        check.forEach((reservation, index) => {
          Room.findAll({
            where: {
              [Op.and]: [
                { room_type: req.body.room_type },
                { room_no: reservation.room_room_no }
              ]
            },
            raw: true
          })
            .then(success => {
              console.log(success);
              if (rooms.indexOf(success[0].room_no) < 0) {
                rooms.push(success[0].room_no);
              }
              // console.log(rooms);
              if (index === check.length - 1) {
                res.json(rooms);
              }
            })
            .catch(error => console.log(error));
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// Add Reservation
router.post("/addreservation", (req, res) => {
  var reservation = {};

  reservation.NIC = req.body.NIC;
  reservation.name = req.body.name;
  reservation.contact = req.body.contact;
  reservation.staying_from = req.body.staying_from;
  reservation.staying_to = req.body.staying_to;

  //Reservation.find({ where: { room_room_no: req.body.room } });
  Reservation.findAll({
    where: {
      [Op.and]: [
        { room_room_no: req.body.room },
        {
          [Op.or]: [
            {
              [Op.and]: [
                { staying_from: { [Op.gt]: req.body.staying_from } },
                { staying_from: { [Op.lt]: req.body.staying_to } }
              ]
            },
            {
              [Op.and]: [
                { staying_from: { [Op.lte]: req.body.staying_from } },
                { staying_to: { [Op.gte]: req.body.staying_to } }
              ]
            },
            {
              [Op.and]: [
                { staying_to: { [Op.gt]: req.body.staying_from } },
                { staying_to: { [Op.lt]: req.body.staying_to } }
              ]
            }
          ]
        }
      ]
    }
  })
    .then(booking => {
      if (booking.length !== 0) {
        console.log(booking);
        res.json("Room Already Booked");
      } else {
        Room.findOne({ where: { room_no: req.body.room } })
          .then(room => {
            room
              .createReservation(reservation)
              .then(sucess => res.json(sucess))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
