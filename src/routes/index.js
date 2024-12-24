const authRouter = require("./auth.route");
const userRouter = require("./users.route");
const express = require("express");

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/api/users", authRouter);
  app.use("/api/posts", userRouter);
};
