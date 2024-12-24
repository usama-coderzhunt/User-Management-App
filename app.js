require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./src/routes");
const express = require("express");
const app = express();
// const User = require("./models/users/user.model.ts");
app.use(express.json());
app.get("/", function (req, res) {
  res.send("Im here");
});

routes(app);

// express database connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected To Database");
    // start server on desired port
    app.listen(3001, () => {
      console.log("Server is running 3001");
    });
  })
  .catch((error) => {
    console.error("Database connection error", error);
    app.use((req, res, next) => {
      next();
    });
  });
