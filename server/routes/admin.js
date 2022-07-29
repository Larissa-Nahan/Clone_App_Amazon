const express = require("express");
const admin = require("../middlewares/admin");
const { Product } = require("../models/product");
const Order = require("../models/order");

const adminRouter = express.Router();

//Add product
adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
    const { name, description, images, quantity, price, category } = req.body;

    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });

    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get all products
adminRouter.get("/admin/get-products", admin, async (req, res) => {
  try {
    const products = await Product.find({}); //(se não especificar o que achar, pega tudo)

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Delete product
adminRouter.post("/admin/delete-product", admin, async (req, res) => {
  try {
    const { id } = req.body;

    let product = await Product.findByIdAndDelete(id);

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get all orders
adminRouter.get("/admin/get-orders", admin, async (req, res) => {
  try {
    const orders = await Order.find({});

    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Change order status
adminRouter.post("/admin/change-order-status", admin, async (req, res) => {
  try {
    const { id, status } = req.body;

    let order = await Order.findById(id);
    order.status = status;

    order = await order.save;
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get total earnings
adminRouter.get("/admin/analytics", admin, async (req, res) => {
  try {
    const orders = await Order.find({});

    let totalEarnings = 0;
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        totalEarnings +=
          orders[i].products[j].quantity * orders[i].products[j].product.price;
      }
    }

    let appliancesEarnings = await fetchCategoryWiseProduct("Appliances");
    let booksEarnings = await fetchCategoryWiseProduct("Books");
    let essentialsEarnings = await fetchCategoryWiseProduct("Essentials");
    let fashionEarnings = await fetchCategoryWiseProduct("Fashion");
    let mobilesEarnings = await fetchCategoryWiseProduct("Mobiles");

    let earnings = {
      totalEarnings,
      appliancesEarnings,
      booksEarnings,
      essentialsEarnings,
      fashionEarnings,
      mobilesEarnings,
    };

    res.json(earnings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function fetchCategoryWiseProduct(category) {
  let categoryOrders = await Order.find({
    "products.product.category": category,
  });

  let earnings = 0;
  for (let i = 0; i < categoryOrders.length; i++) {
    for (let j = 0; j < categoryOrders[i].products.length; j++) {
      earnings +=
        categoryOrders[i].products[j].quantity *
        categoryOrders[i].products[j].product.price;
    }
  }
  return earnings;
}

module.exports = adminRouter;
