const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//creating connection
const db = require("./config/database");

const Client = require("./models/Client");
const Employee = require("./models/Employee");
const Room = require("./models/Room");
const Service_Detail = require("./models/Service_Detail");
const Reservation = require("./models/Reservation");

//Testing database
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) => res.send("Hello"));

app.use("/employee", require("./routes/employee"));
app.use("/client", require("./routes/client"));
app.use("/reservation", require("./routes/reservation"));
app.use("/room", require("./routes/room"));

//app.use("/api/users", users);
//app.use("/api/schools", schools);
//app.use("/api/payments", payments);

Room.hasOne(Client, { onDelete: "CASCADE" });
Room.hasMany(Reservation);
Employee.belongsToMany(Room, { through: Service_Detail });

db.sync()
  .then()
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
