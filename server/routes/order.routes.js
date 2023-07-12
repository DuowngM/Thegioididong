const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const moment = require("moment-timezone");
router.get("/", async (req, res) => {
  try {
    const [order] = await database.execute(
      "SELECT thegioididong.order.order_id, thegioididong.order.customerId, thegioididong.order.total, thegioididong.order.note, thegioididong.order.createdDate, thegioididong.order.status, thegioididong.order.method, users.user_name, users.phoneNumber  FROM thegioididong.order INNER JOIN users ON thegioididong.order.customerId = users.user_id"
    );
    res.json({
      status: 200,
      order,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [order] = await database.execute(
      "SELECT thegioididong.order.order_id, thegioididong.order.customerId, thegioididong.order.total, thegioididong.order.note, thegioididong.order.createdDate, thegioididong.order.status, thegioididong.order.method, users.user_name, users.phoneNumber  FROM thegioididong.order INNER JOIN users ON thegioididong.order.customerId = users.user_id where customerId = ?",
      [id]
    );
    res.json({
      status: 200,
      order,
    });
  } catch (error) {
    throw new Error(error);
  }
});
router.post("/", async (req, res) => {
  const { customerId, total, note, method } = req.body;
  try {
    const currentDate = moment()
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYY-MM-DD HH:mm:ss");
    await database.execute(
      "INSERT INTO `thegioididong`.`order` (`customerId`, `total`, `note`, `createdDate`, `status`, `method`) VALUES (?, ?, ?, ?, 'Chờ xác nhận', ?)",
      [customerId, total, note, currentDate, method]
    );
    const [newOrder] = await database.execute(
      "SELECT * FROM thegioididong.order ORDER BY `order_id` DESC LIMIT 1"
    );
    res.json(newOrder);
  } catch (error) {
    throw new Error(error);
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.execute(
      "UPDATE `thegioididong`.`order` SET `status` = 'Đã hủy' WHERE order_id = ?",
      [id]
    );
    res.json({
      status: 200,
    });
  } catch (error) {
    throw new Error(error);
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.execute(
      "UPDATE `thegioididong`.`order` SET `status` = 'Hoàn thành' WHERE order_id = ?",
      [id]
    );
    res.json({
      status: 200,
    });
  } catch (error) {
    throw new Error(error);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await database.execute(
      "DELETE FROM thegioididong.order WHERE order_id = ?",
      [id]
    );

    res.json({
      status: 200,
      message: "Xóa đơn hàng thành công",
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
