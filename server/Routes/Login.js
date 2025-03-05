const express = require("express");
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const cors = require("cors");
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

router.use(express.json());
router.use(cookieParser());

router.post("/", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            return res.status(500).json({ error: "An error occurred" });
          }
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json(token);
            //return res.json({Status:"Success",role:user.role});
          } else {
            return res.json("The password is incorrect");
          }
        });
      } else {
        return res.json("No record existed");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
