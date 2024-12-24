var jwt = require("jsonwebtoken");
// auth middleware
module.exports = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Token is required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error?.errors?.length) {
      return res.status(500).json({ error: error?.errors[0]?.message });
    } else {
      if (error.message?.length) {
        if (error.message.includes("jwt expired")) {
          return res
            .status(409)
            .json({ message: "Token expired please login again." });
        }
      }
      res.status(401).json({ message: "Authentication failed" });
    }
  }
};
