const Sequelize = require("sequelize");
const db = require("../config/database");

const Service_Detail = db.define("Service_Detail", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_type: {
    type: Sequelize.STRING
  }
});

module.exports = Service_Detail;
