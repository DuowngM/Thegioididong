const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/", async (req, res) => {
  try {
    let [voucher] = await database.execute("SELECT * FROM voucher ");
    if (voucher) {
      res.json({
        status: 200,
        voucher,
      });
    } else {
      res.json({
        status: 404,
        message: "Voucher not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    let [voucher] = await database.execute(
      "SELECT * FROM voucher where voucher_name = ?",
      [name]
    );

    if (voucher) {
      res.json({
        status: 200,
        voucher,
      });
    } else {
      res.json({
        status: 404,
        message: "Voucher not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  const { voucherName, voucherDiscount } = req.body;
  try {
    await database.execute(
      "INSERT INTO voucher (voucher_name, voucher_discount) VALUES (?, ?)",
      [voucherName, voucherDiscount]
    );
    res.json({
      status: 201,
    });
  } catch (error) {
    throw new Error(error);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await database.execute("DELETE FROM voucher WHERE voucher_id = ?", [id]);
    res.json({
      status: 200,
      message: "Xóa voucher thành công",
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
