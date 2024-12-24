const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/createUser", AuthController.createUser);
router.post("/loginUser", AuthController.loginUser);
module.exports = router;
