const Sequelize = require("sequelize");
const db = require("../config/database");

const Employee = db.define(
  "employee",
  {
    NIC: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.CHAR
    },
    address: {
      type: Sequelize.STRING
    },
    designation: {
      type: Sequelize.STRING
    },
    salary: {
      type: Sequelize.INTEGER
    }
  },
  { freezeTableName: true, underscored: true }
);

module.exports = Employee;
