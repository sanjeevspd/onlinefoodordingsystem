const express = require("express");
const router = express.Router();
const productModel = require("../Models/AddResModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../food/public/Images"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    console.log("error" + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const product = new productModel({
    rid: req.body.id,
    image: req.file.image,
    name: req.body.name,
    email: req.body.email,
    password:req.body.password, // Corrected the field name from 'qunatity' to 'quantity'
  });
  try {
    const products = await product.save();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:pid", async (req, res) => {
  try {
    const deletedProduct = await productModel.findOneAndDelete({
      pid: req.params.pid,
    });

    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve static files from the 'public' directory
router.use(express.static("public"));

module.exports = router;
