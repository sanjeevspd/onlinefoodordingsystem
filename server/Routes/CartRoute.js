const express = require("express");
const router = express.Router();
const productModel = require("../Models/CartModel");
//CartRoute
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    console.log("error" + err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/add", async (req, res) => {
  try {
    console.log("pid" + req.body.pid);
    const existingProduct = await productModel.findOne({ pid: req.body.pid });
    // console.log(existingProduct);
    if (existingProduct) {
      // If the product already exists, update the quantity
      (existingProduct.quantity = req.body.quantity),
        await existingProduct.save();
      //res.json(existingProduct);
    } else {
      // If the product doesn't exist, create a new item
      const product = new productModel({
        pid: req.body.pid,
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        coins: req.body.coins,
        quantity: 1,
      });
      const newProduct = await product.save();
      res.json(newProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/add/i", async (req, res) => {
  try {
    console.log("pid" + req.body.pid);
    const existingProduct = await productModel.findOne({ pid: req.body.pid });
    // console.log(existingProduct);
    if (existingProduct) {
      // If the product already exists, update the quantity
      existingProduct.quantity += 1;
      await existingProduct.save();
      //res.json(existingProduct);
    } else {
      // If the product doesn't exist, create a new item
      const product = new productModel({
        pid: req.body.pid,
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        coins: req.body.coins,
        quantity: 1,
      });
      const newProduct = await product.save();
      res.json(newProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const st = await productModel.findById(req.params.id); //in request params we will have the requested id info
    st.quantity = req.body.quantity;
    const s1 = await st.save(); //saving the updated object by save method
    res.json(s1);
  } catch (err) {
    res.send("Error" + err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await productModel.findOneAndDelete({
      _id: req.params.id,
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


module.exports = router;
