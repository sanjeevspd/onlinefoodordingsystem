const express = require("express");
const router = express.Router();
const WhatModel = require("../Models/WhatsOnMind");
router.get("/", async (req, res) => {
    try {
      const products = await WhatModel.find();
      res.json(products);
    } catch (err) {
      console.log("error" + err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  router.post("/add", async (req, res) => {
    const product = new WhatModel({
      image: req.body.image,
      name: req.body.name,
      link:req.body.link
    });
    try {
      const products = await product.save();
      res.json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  module.exports = router;