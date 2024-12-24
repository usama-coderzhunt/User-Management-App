const express = require("express");
const Auth = require("../middlewares/Auth.js");
const UserController = require("../controllers/user.controller.js");
const Constants = require("../../utils/constants/constants.js");
const router = express.Router();
const can = require("../middlewares/canAccess.js");
// User routes
router.post(
  "/createPost",
  Auth,
  can(Constants.PERMISSION_ADD_A_POST),
  UserController.createPost
);
router.get(
  "/singlePost/:id",
  Auth,
  can(Constants.PERMISSION_VIEW_A_POST),
  UserController.getPostById
);
router.delete(
  "/deletePost/:id",
  Auth,
  can(Constants.PERMISSION_DELETE_A_POST),
  UserController.deletePost
);
router.put(
  "/updatePost/:id",
  Auth,
  can(Constants.PERMISSION_UPDATE_A_POST),
  UserController.updatePost
);
router.get(
  "/",
  Auth,
  can(Constants.PERMISSION_VIEW_ALL_POSTS),
  UserController.posts
);
module.exports = router;
