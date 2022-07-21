const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No auth token! Access Denied" }); //status 401: não autorizado

    const verifiedToken = jwt.verify(token, "passwordKey");
    if (!verifiedToken)
      return res
        .status(401)
        .json({ msg: "Token verification failed! Authorization Denied" });

    req.user = verifiedToken.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;