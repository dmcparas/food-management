const express = require('express');
const mongo = require("./scripts/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const { auth } = require("./tokenValidation");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));


const studentRegRoutes = require("./routes/studentsRoutes");
const wardenRegRoutes = require("./routes/wardenRoutes");
const messInchargeRegRoutes = require("./routes/messInchargeRoutes");
const foodDetails = require("./routes/foodDetailsRoutes");



app.use(studentRegRoutes);
app.use(wardenRegRoutes);
app.use(messInchargeRegRoutes);

app.use(auth);

app.use(foodDetails);

app.use(function(err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  // logger.info(req.originalUrl);
  // logger.error(err.message);
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
  next();
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(
      "todo list RESTful API server started on: " + process.env.SERVER_PORT
    );
  });