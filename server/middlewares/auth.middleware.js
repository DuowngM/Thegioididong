const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const database = require("../utils/database");
const jwt = require("jsonwebtoken");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const checkEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

function isAuth(req, res, next) {
  let authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    let token = authorization.split(" ")[1];
    try {
      let decoded = jwt.verify(token, process.env.SECRET);
      req.customerId = decoded.customerId;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: 401,
          message: "Token has expired",
        });
      }
      console.log(error);
      return res.status(401).json({
        status: 401,
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
}
function checkRole(req, res, next) {
  let id = req.headers.customer_id;
  console.log(id);
}
module.exports = { checkEmpty, isAuth, checkRole };
