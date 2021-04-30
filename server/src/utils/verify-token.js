
// middleware to validate token

import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const verifyToken = (req, res, next) => {

  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, config.JWT_SECRET, function (err, verified) {

    if (err)
      return res.status(500).json({ error: 'Authentication error' });

    next();
  });
}


export default verifyToken;