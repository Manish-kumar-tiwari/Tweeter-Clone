const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Token is not find" });
    }

    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = isVerified.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
