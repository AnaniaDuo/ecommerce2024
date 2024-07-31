const express = require("express");
const router = express.Router();
const app = express();
const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Not Allowed");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { requireToken, isAdmin };
