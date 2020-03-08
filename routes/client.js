const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Client = require("../models/Client");
const Room = require("../models/Room");

// Testing Route
router.get("/", (req, res) => {
  res.json("Client Route Tested");
});

// Get All Clients
router.get("/getallclient", (req, res) => {
  Client.findAll()
    .then(clients => res.json(clients))
    .catch(err => console.log(err));
});

// Get Client By Name
router.post("/getclientbyname", (req, res) => {
  Client.findAll({ where: { name: req.body.name } })
    .then(client => {
      res.json(client);
    })
    .catch(err => console.log(err));
});

// Get Client By Room No
router.post("/getclientbyroom", (req, res) => {
  Client.findAll({ where: { room_room_no: req.body.room } })
    .then(client => {
      res.json(client);
    })
    .catch(err => {
      console.log(err);
    });
});

// Add or Update Client
router.post("/updateclient", (req, res) => {
  var client = {};
  client.NIC = req.body.NIC;
  client.name = req.body.name;
  client.contact = req.body.contact;
  client.staying_from = req.body.staying_from;
  client.staying_to = req.body.staying_to;

  Room.findOne({ where: { room_no: req.body.room } })
    .then(result => {
      result.createClient(client);
    })
    .catch(err => console.log(err));
});

module.exports = router;
