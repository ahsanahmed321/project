const express = require("express");
const router = express.Router();
const db = require("../config/database");

const Employee = require("../models/Employee");
const Room = require("../models/Room");
const Service_Detail = require("../models/Service_Detail");

// Testing Route
router.get("/", (req, res) => {
  res.json("Employee Route Tested");
});

// Get All Employee
router.get("/getallemployee", (req, res) => {
  Employee.findAll()
    .then(employees => res.json(employees))
    .catch(err => console.log(err));
});

// Get Employee By Name
router.post("/getemployee", (req, res) => {
  Employee.findAll({ where: { name: req.body.name } })
    .then(employee => {
      res.json(employee);
    })
    .catch(err => console.log(err));
});

// Add or Update Employee
router.post("/updateemployee", (req, res) => {
  var emp = {};
  emp.NIC = req.body.NIC;
  emp.name = req.body.name;
  emp.contact = req.body.contact;
  emp.address = req.body.address;
  emp.designation = req.body.designation;
  emp.salary = req.body.salary;

  Employee.findOne({ where: { NIC: req.body.NIC } })
    .then(employee => {
      if (employee) {
        Employee.update(emp, { where: { NIC: req.body.NIC } })
          .then(success => res.json(success))
          .catch(err => console.log(err));
      } else {
        Employee.create(emp)
          .then(success => res.json(success))
          .catch(err => res.json(err));
      }
    })
    .catch(err => console.log(err));
});

//Assign Employee to room for service

router.post("/assignemployee", (req, res) => {
  Employee.findOne({ where: { NIC: req.body.NIC } })
    .then(employee => {
      Room.findOne({ where: { room_no: req.body.room } })
        .then(room => {
          employee
            .addRoom(room, { through: Service_Detail })
            .then(success => {
              Service_Detail.update(
                { service_type: req.body.service },
                {
                  where: {
                    employee_NIC: req.body.NIC,
                    room_room_no: req.body.room
                  }
                }
              )
                .then(suc => res.json(suc))
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
