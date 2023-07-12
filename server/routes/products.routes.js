const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/", async (req, res) => {
  try {
    let [products] = await database.execute(
      "SELECT * FROM products ORDER BY product_id DESC"
    );
    res.json({
      status: 200,
      products,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let [products] = await database.execute(
      "SELECT * FROM products WHERE categoryId = ?",
      [id]
    );
    res.json({
      status: 200,
      products,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let [products] = await database.execute(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );
    res.json({
      status: 200,
      products,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/find/search", async (req, res) => {
  try {
    const { key } = req.query;
    let [products] = await database.execute(
      "SELECT * FROM products WHERE product_name LIKE ?",
      [`%${key}%`]
    );
    res.json({
      status: 200,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      product_name,
      product_stocks,
      price,
      categoryId,
      description,
      brandId,
      product_image,
    } = req.body;

    const values = [
      product_name,
      product_stocks,
      +price,
      categoryId,
      description,
      brandId,
      product_image,
    ];
    await database.execute(
      "INSERT INTO products (product_name, product_stocks, price, categoryId, description, brandId,product_image, sold) VALUES (?, ?, ?, ?, ?, ?, ?,0)",
      values
    );
    const [newProduct] = await database.execute(
      "SELECT * FROM thegioididong.products ORDER BY product_id DESC LIMIT 1"
    );
    res.json({
      status: 201,
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal server error",
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const orderDetails = req.body;
    for (let i = 0; i < orderDetails.length; i++) {
      const productId = orderDetails[i].idProduct;
      const quantity = orderDetails[i].quantity;
      await database.execute(
        "UPDATE products SET product_stocks = product_stocks - ?, sold = sold + ? WHERE product_id = ?",
        [quantity, quantity, productId]
      );
    }
    res.json({
      status: 200,
      message: "Số lượng sản phẩm đã được cập nhật trong kho.",
    });
  } catch (error) {
    res.json({ error });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.execute("DELETE FROM products WHERE product_id = ?", [id]);

    res.json({
      status: 200,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Lỗi server",
    });
  }
});
module.exports = router;
