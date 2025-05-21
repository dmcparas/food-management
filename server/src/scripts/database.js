let mongoose = require("mongoose");
require('dotenv').config();
let mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/food-management`;
mongoose.connect(mongoDB, { useNewUrlParser: true,useFindAndModify: false });

let db = mongoose.connection;



db.on("error", console.error.bind(console, "MongoDB connection error:"));