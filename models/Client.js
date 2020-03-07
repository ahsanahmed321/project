const Sequelize = require("sequelize");
const db = require("../config/database");

const Client = db.define(
  "Client",
  {
    NIC: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.INTEGER
    },

    staying_from: {
      type: Sequelize.DATE
    },
    staying_to: {
      type: Sequelize.DATE
    }
  },
  { freezeTableName: true, underscored: true }
);

module.exports = Client;
