var jwt = require("jsonwebtoken");
// can access middleware
module.exports = (permissions) => async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userRole = decoded.role;
    if (permissions.includes(userRole)) return next();
    else return res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    if (error?.errors?.length) {
      return res.status(500).json({ error: error?.errors[0]?.message });
    } else {
      res.status(401).json({ message: error.message });
    }
  }
};
