require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:admin@cluster0.kyiehv9.mongodb.net/";
const CartRoute = require("./Routes/CartRoute");
const FoodRoute = require("./Routes/FoodPage");
const LoginRoute = require("./Routes/Login");
const RegisterRoute = require("./Routes/RegisterRoute");
// const Restaurant = require("./Routes/Restaurant");
const DriverRoute = require("./Routes/DriverRoute");
const WhatRoute = require("./Routes/WhatRoute");
const OrderRoute = require("./Routes/OrderByRoute");
const AddResRoute = require("./Routes/AddRestaraunt");
const Categories = require("./Routes/Categories");
const multer = require("multer");
const PreOrderRoute = require("./Routes/PreOrderRoute");
mongoose.connect(uri); //provides the link between database and client
const con = mongoose.connection;
con.on("open", () => {
  console.log("connected with mongodb");
});
const app = express();
app.use(express.json()); //since we deal with json format we use this express.json
//using app obj we are converting into json format
app.use(cors()); //to use cors
app.use("/cart", CartRoute);
app.use("/food", FoodRoute);
app.use("/login", LoginRoute);
app.use("/register", RegisterRoute);
// app.use("/restaurant", Restaurant);
app.use("/driver", DriverRoute);
app.use("/what", WhatRoute);
app.use("/order", OrderRoute);
app.use("/restaraunt", AddResRoute);
app.use("/categories", Categories);
app.use("/preorder", PreOrderRoute);
app.use(express.static("public"));
app.use(cors());

// Define your CORS configuration here, allowing requests from your frontend origin (http://localhost:3000)
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const stripe = require("stripe")("sk_test_51O8IJoSEQPSKlcZjAC9fHeBPNLdBQuVIAXVpZcngiqiml2025tR7z0vfyM4ylANc7K6dP80Wl23CiXQggarVOWbC00ggjAkvnk");

app.post("/create-checkout-session", async (req, res) => {
  const totalAmount = req.body.totalAmount; // Calculate the total amount
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: totalAmount * 100, // Amount in paise
            product_data: {
              name: "Total Amount", // You can provide a label for the total amount
            },
          },
          quantity: 1, // Quantity of 1, as it's the total amount
        },
      ],
      success_url: "http://localhost:3000/success", // Specify your success URL
      cancel_url: "http://localhost:3000/cancel", // Specify your cancel URL
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(9999, () => {
  console.log("server started at port 9999");
});
