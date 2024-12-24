const User = require("../models/users/user.model.js");
const bcrypt = require("bcrypt");
const {
  zodLoginSchema,
  zodCreateNewUserScehma,
} = require("../../utils/Validation Schemas/Schemas.js");
var jwt = require("jsonwebtoken");

module.exports = {
  // create a new user
  async createUser(req, res) {
    const saltRounds = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltRounds);
    try {
      zodCreateNewUserScehma.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      const newUser = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        role: req.body.role,
      });
      const data = { id: newUser.id };
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
      res.status(200).json({
        authToken,
      });
    } catch (error) {
      if (error?.errors?.length) {
        return res.status(500).json({ error: error?.errors[0]?.message });
      } else {
        if (error.message?.length) {
          //empty, undefined, null check
          if (error.message.includes("duplicate key error")) {
            return res.status(409).json({ message: "Email already exists." });
          }
        }
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },

  // login a user
  async loginUser(req, res) {
    try {
      zodLoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Email not found." });
      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword)
        return res.status(401).json({ message: "Incorrect password." });

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({
        authToken,
      });
    } catch (error) {
      if (error?.errors) {
        return res.status(500).json({ error: error?.errors[0]?.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
