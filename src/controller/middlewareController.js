import { query } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      console.log(accessToken);
      if (err) {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Token is not valid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(200).json("You're not authenticatedssssssssssss");
  }
};

const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.roleId);
    if (req.user.id == req.body.id || req.user.roleId === "Admin") {
      next();
    } else {
      return res.status(200).json("You're not allowed to delete other");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdminAuth,
};
