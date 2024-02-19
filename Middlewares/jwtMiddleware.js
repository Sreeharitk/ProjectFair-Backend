const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("inside jwt middle ware");
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    if (token) {
        const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(jwtResponse);
        req.payload = jwtResponse.userID
        next();
    }
  } catch {
    res.status(401).json("Access denied...Please login to continue");
  }
};

module.exports = jwtMiddleware;
