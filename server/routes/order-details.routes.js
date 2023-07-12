const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [orderDetails] = await database.execute(
      `SELECT order_details.order_id,
              order_details.quantity,
              order_details.address,
              products.product_image,
              products.product_name,
              products.price,
              thegioididong.order.total,
              users.user_name,
              users.phoneNumber
       FROM order_details
       INNER JOIN products ON order_details.idProduct = products.product_id
       INNER JOIN thegioididong.order ON order_details.order_id = thegioididong.order.order_id
       INNER JOIN users ON users.user_id = thegioididong.order.customerId
       WHERE order_details.order_id = ?`,
      [id]
    );
    res.json({
      status: 200,
      orderDetails,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const orderDetails = req.body;
  try {
    for (let i = 0; i < orderDetails.length; i++) {
      await database.execute(
        "INSERT INTO order_details (order_id, idProduct, quantity, address) VALUES (?, ?, ?, ?)",
        [
          orderDetails[i].order_id,
          orderDetails[i].idProduct,
          orderDetails[i].quantity,
          orderDetails[i].address,
        ]
      );
    }
    res.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
