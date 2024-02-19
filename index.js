// Loads .env file contents into process.env by default. and since its not used in the file anywhere we do not need to store in variable
require("dotenv").config();
//import express
const express = require("express");
//import cors
const cors = require("cors");
// import routes
const router = require("./Routes/router");
//import database connection
require("./DB/connection")

//creating an express server
const pfServer = express();

//use of cors in server
pfServer.use(cors());

//since shared data will be in JSON format we use this method to convert JSON to JS
pfServer.use(express.json());

//using router
pfServer.use(router);

//to make a file/folder available for other applications
pfServer.use("/uploads", express.static("./Uploads"))

//assig a port number for the server to be hosted on
const PORT = 3000 || process.env.PORT

//hosting the pfserver on 3000
pfServer.listen(PORT, () => {
  console.log(`Project fair Server running on PORT: ${PORT}`);
});

//to resolve get http request to base URL of server
pfServer.get("/", (req, res) => {
  res.send("<h1>Project fair Server running... wating for client<h1/>");
});
