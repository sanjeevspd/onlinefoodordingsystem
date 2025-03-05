const express = require("express");
const router = express.Router();
const OrderModel = require("../Models/OrderByModel");
router.get("/", async (req, res) => {
  try {
    const products = await OrderModel.find();
    res.json(products);
  } catch (err) {
    console.log("error" + err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/add", async (req, res) => {
  const product = new OrderModel({
    rid: req.body.rid,
    name: req.body.name,
    ownername: req.body.ownername,
    image: req.body.image,
    email: req.body.email,
    password: req.body.password,
    link: req.body.link,
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
