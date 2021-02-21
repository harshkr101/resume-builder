
// middleware to validate token

import  verify  from "jsonwebtoken";
import {config} from "../config/config.js";

const verifyToken = (req, res, next) => {
 
  const token = req.header("auth-token");

  if (!token){
     return res.status(401).json({ error: "Access denied" }); 
  }

  try {
    const verified = verify(token,config.JWT_SECRET);
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
export default verifyToken;