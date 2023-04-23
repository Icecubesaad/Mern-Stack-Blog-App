const jwt = require("jsonwebtoken");
const jwt_secret = "ICECUBE";
const fetchDetails = async (req, res, next) => {
  const token = req.header("jwt_token");
  if (token) {
    const verify = await jwt.verify(token, jwt_secret);
    if (verify) {
      try {
        req.user = verify.User_Id;
        next();
      } catch (error) {
        res.send({ error });
      }
    } else {
      res.send({ error: "Server error" });
    }
  } else {
    res.send("Invalid error");
  }
};
module.exports = fetchDetails;
