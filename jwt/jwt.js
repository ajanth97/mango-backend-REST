const jwt = require("jsonwebtoken");

const jwtTokenSecret = process.env.JWTSECRET;

const generateToken = (userId) => {
  const tokenData = {
    id: userId,
  };
  const jwtToken = jwt.sign(tokenData, jwtTokenSecret, { expiresIn: "1h" });
  return jwtToken;
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Malformed or expired JWT",
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: "JWT not found in header",
    });
  }
};

module.exports = {
  generateToken,
  authenticateJWT,
};
