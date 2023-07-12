const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rate] = await database.execute(
      "SELECT * FROM thegioididong.rate INNER JOIN thegioididong.users ON users.user_id = rate.idUser WHERE pro_id = ?",
      [id]
    );
    res.json({
      status: 200,
      rate,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  const { pro_id, rate, comment, userId } = req.body;

  try {
    await database.execute(
      "INSERT INTO thegioididong.rate (pro_id, idUser, rate_points,comment) VALUES (?, ? ,? ,?)",
      [pro_id, userId, rate, comment]
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
    await database.execute("DELETE FROM rate WHERE rate_id = ?", [id]);
    res.json({
      status: 200,
      message: "Xóa bình luận thành công",
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
