// const express = require("express");
// const UserModel = require("../Models/UserModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const router = express.Router();
// const cors = require("cors");

// router.post("/", async (req, res) => {
//   const { name, email, password, firstname, lastname, address, phoneno } =
//     req.body;

//   // Check if the user already exists by searching for their email
//   UserModel.findOne({ email: email })
//     .then((existingUser) => {
//       if (existingUser) {
//         // User already exists, return an error response
//         return res.status(201).json({ message: "User already exists" });
//       }

//       // User doesn't exist, proceed with registration
//       bcrypt
//         .hash(password, 10)
//         .then((hash) => {
//           UserModel.create({
//             name,
//             email,
//             password: hash,
//             firstname,
//             lastname,
//             address,
//             phoneno,
//           })
//             .then((user) => res.json("Success"))
//             .catch((err) => res.json(err));
//         })
//         .catch((err) => res.json(err));
//     })
//     .catch((err) => res.json(err));
// });

// router.get("/", async (req, res) => {
//   try {
//     const login = await UserModel.find();
//     res.status(201).json(login);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const cors = require("cors");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, address, phoneNumber } = req.body; // Corrected field names

  // Check if the user already exists by searching for their email
  UserModel.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        // User already exists, return an error response
        return res.status(201).json({ message: "User already exists" });
      }

      // User doesn't exist, proceed with registration
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          UserModel.create({ firstName, lastName, email, password: hash, address, phoneNumber })
            .then((user) => res.json("Success"))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

router.get("/", async (req, res) => {
  try {
    const login = await UserModel.find();
    res.status(201).json(login);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;