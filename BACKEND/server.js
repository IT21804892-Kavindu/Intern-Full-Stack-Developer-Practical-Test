const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4011;

// Set the port for the server to listen on
app.use(cors());
app.use(bodyParser.json());

// Retrieve MongoDB connection URL from environment variables
const URL = process.env.MONGODB_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  connection.once("open", () => {
    console.log("MongoDB Connection success!");
  });

  const deviceRouter = require("./routes/Device.js");

  app.use("/device", deviceRouter);
  
  app.listen(PORT, () => {
    console.log(`Server is up and running on the port number: ${PORT}`);
  });