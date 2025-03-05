const express = require("express");
const router = express.Router();
const productModel = require("../Models/RestarauntModel");

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
  const product = new productModel({
    pid: req.body.pid,
    image: req.body.image,
    name: req.body.name,
    price: req.body.price,
    coins: req.body.coins,
    category: req.body.category,
    qunatity: 1,
  });
  try {
    const products = await product.save();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// router.delete("/delete/:pid", async (req, res) => {
//     try {
//       const st = await productModel.findById(req.params.pid);
//       const s1 = await st.deleteOne(); //deleting the required id
//       res.json(s1); //sending the updated response to the postman
//     } catch (err) {
//         res.json(err);
//     }
//   });
//   router.patch("/update/:pid", async (req, res) => {
//     try {
//       console.log(req.params.pid);
//       const st = await productModel.findById(req.params.pid); //in request params we will have the requested id info
//       st.price= req.body.price;
//       st.image=req.body.image;
//       st.name=req.body.name;
//       const s1 = await st.save(); //saving the updated object by save method
//       res.json(s1);
//     } catch (err) {
//       res.send("Error" + err);
//     }
//   });
router.post("/update", async (req, res) => {
  try {
    const existingProduct = await productModel.findOne({ pid: req.body.pid });

    if (existingProduct) {
      existingProduct.quantity = req.body.quantity;
      existingProduct.image = req.body.image;
      existingProduct.price = req.body.price;

      const updatedProduct = await existingProduct.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await productModel.findOneAndDelete({
      id: req.params.id,
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
