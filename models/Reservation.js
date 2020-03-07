const Sequelize = require("sequelize");
const db = require("../config/database");

const Reservation = db.define(
  "reservation",
  {
    NIC: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.CHAR
    },
    staying_from: {
      type: Sequelize.DATEONLY
    },
    staying_to: {
      type: Sequelize.DATEONLY
    }
  },
  { freezeTableName: true, underscored: true }
);

module.exports = Reservation;
