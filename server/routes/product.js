const express = require("express");
const auth = require("../middlewares/auth");
const Product = require("../models/product");

const productRouter = express.Router();

productRouter.get("/api/products", auth, async (req, res) => {
  try {
    // console.log(req.query.category);
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" }, //(usa o regex para poder pesquisar o nome similar, sem necessariamente ser o mesmo)
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Deleta a avaliação anterior e coloca uma nova
productRouter.post("/api/rate-product", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.lenght; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
