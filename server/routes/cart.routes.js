const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/", async (req, res) => {
  try {
    let [cart] = await database.execute("SELECT * FROM cart");
    console.log(cart);
    res.json({
      status: 200,
      cart,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let [cart] = await database.execute(
      "SELECT products.product_stocks,products.product_id,products.product_name,products.product_image, products.price, cart.quantity, cart.user_id FROM cart INNER JOIN products ON cart.productId = products.product_id WHERE user_id = ?",
      [id]
    );
    res.json({
      status: 200,
      cart,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const [existingCartItem] = await database.execute(
      "SELECT * FROM cart WHERE user_id = ? AND productId = ?",
      [userId, productId]
    );

    if (existingCartItem.length === 0) {
      await database.execute(
        "INSERT INTO cart (user_id, productId, quantity) VALUES (?, ?, 1)",
        [userId, productId]
      );
    } else {
      await database.execute(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND productId = ?",
        [userId, productId]
      );
    }

    res.json({
      status: 201,
      message: "Thêm vào giỏ hàng thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Lỗi server",
    });
  }
});

router.delete("/", async (req, res) => {
  const idUser = req.query.idUser;
  try {
    await database.execute("DELETE FROM cart WHERE user_id = ?", [idUser]);

    res.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Lỗi server",
    });
  }
});
router.delete("/:id/:userId", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  try {
    await database.execute(
      "DELETE FROM cart WHERE productId = ? AND user_id = ?",
      [id, userId]
    );
    res.json({
      status: 200,
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
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
