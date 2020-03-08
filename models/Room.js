const Sequelize = require("sequelize");
const db = require("../config/database");

const Room = db.define(
  "Room",
  {
    room_no: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    room_type: {
      type: Sequelize.STRING
    },
    is_empty: {
      type: Sequelize.BOOLEAN
    }
  },
  { freezeTableName: true, underscored: true }
);

module.exports = Room;
