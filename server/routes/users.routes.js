const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const database = require("../utils/database");
require("dotenv").config();
router.get("/", async (req, res) => {
  try {
    const [user] = await database.execute("SELECT * FROM users ");
    res.json({
      status: 200,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const [user] = await database.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [req.params.id]
    );
    res.json({
      status: 200,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const [user] = await database.execute(
      "SELECT * FROM users WHERE phoneNumber = ? AND password = ?",
      [phoneNumber, password]
    );
    if (user[0].status === "Unavailable") {
      return res.json({
        status: 400,
      });
    }
    if (user.length === 0) {
      return res.json({
        status: 401,
        message: "Số điện thoại hoặc mật khẩu không đúng",
      });
    }
    res.json({
      status: 200,
      message: "Đăng nhập thành công",
      user,
    });
  } catch (error) {
    console.error("Lỗi đăng nhập", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    let [existingUser] = await database.execute(
      "SELECT * FROM users WHERE phoneNumber = ? ",
      [phoneNumber]
    );
    if (existingUser.length > 0) {
      return res.json({
        status: "existed",
        message: "Số điện thoại đã được đăng ký",
      });
    }
    await database.execute(
      `INSERT INTO users (phoneNumber,password, roles, status) VALUES ('${phoneNumber}', '${password}', 0, "Available")`
    );
    res.json({
      status: 201,
      message: "Thêm User thành công",
    });
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_name, address, gender, date_of_birth } = req.body;

  try {
    await database.execute(
      "UPDATE users SET user_name = ?, address = ?, gender = ?, date_of_birth = ? WHERE user_id = ?",
      [user_name, address, +gender, date_of_birth, id]
    );
    res.json({
      status: 200,
      message: "Cập nhật thông tin người dùng thành công",
    });
  } catch (error) {
    console.error("Lỗi cập nhật thông tin người dùng", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    const [user] = await database.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );
    const currentPassword = user[0].password;
    if (currentPassword !== oldPassword) {
      return res.json({
        status: 401,
        message: "Mật khẩu cũ không đúng",
      });
    }
    await database.execute("UPDATE users SET password = ? WHERE user_id = ?", [
      newPassword,
      id,
    ]);
    res.json({
      status: 200,
      message: "Cập nhật mật khẩu thành công",
    });
  } catch (error) {
    console.error("Lỗi cập nhật mật khẩu", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
});
router.put("/", async (req, res) => {
  const { id } = req.body;
  try {
    await database.execute(
      "UPDATE users SET status = 'Unavailable' WHERE user_id = ?",
      [id]
    );
    res.json({
      status: 200,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
router.patch("/", async (req, res) => {
  const { id } = req.body;
  try {
    await database.execute(
      "UPDATE users SET status = 'Available' WHERE user_id = ?",
      [id]
    );
    res.json({
      status: 200,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = router;
