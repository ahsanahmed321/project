const Sequelize = require("sequelize");

module.exports = new Sequelize("hotel", "root", "mysql3600", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});
